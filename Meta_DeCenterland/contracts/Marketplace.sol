// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol"; // provides counters for tracking the number of NFTs sold and the token ID for each NFT
import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // interface for the ERC721 standard
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // protects against re-entrancy attacks

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _nftsSold; // counter for the number of NFTs sold
    Counters.Counter private _tokenIdCounter; // counter for assigning unique token IDs to NFTs
    uint256 public LISTING_FEE = 0.0001 ether; // the fee charged by the marketplace to list an NFT
    address payable private _marketOwner; // address of the owner of the marketplace
    mapping(uint256 => NFT) private _idToNFT; // maps token IDs to NFT structs
    struct NFT {
        address nftContract; // address of the NFT contract
        uint256 tokenId; // ID of the NFT
        address payable seller; // address of the seller of the NFT
        address payable owner; // address of the current owner of the NFT
        uint256 price; // price of the NFT
        bool onSale; // indicates whether the NFT is currently for sale
    }
    event NFTListed(
        address nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price
    );
    event NFTSold(
        address nftContract,
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price
    );

    constructor() {
        _marketOwner = payable(msg.sender); // sets the marketplace owner to the address that deployed the contract
    }

    function listNft(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        require(_price > 0, "Price must be at least 1 wei"); // ensures that the NFT price is greater than 0
        require(msg.value == LISTING_FEE, "Not enough ether for listing fee"); // ensures that the caller has sent enough ether to cover the listing fee

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId); // transfers the NFT to the marketplace contract

        _tokenIdCounter.increment(); // increments the token ID counter to assign a unique ID to the NFT
        uint256 tokenId = _tokenIdCounter.current();

        _idToNFT[tokenId] = NFT( // creates a new NFT struct for the listed NFT
            _nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            _price,
            true
        );

        emit NFTListed(_nftContract, tokenId, msg.sender, address(this), _price); // emits an event indicating that a new NFT has been listed for sale
    }

    // Event emitted when an NFT's details are updated
    event NFTDetailsUpdated(address indexed owner, address indexed seller, uint256 price);

    function buyNft(address _nftContract, uint256 _tokenId) public payable nonReentrant {
        // Retrieve the NFT with the specified token ID
        NFT storage nft = _idToNFT[_tokenId];

        // Ensure that the NFT is currently listed for sale
        require(nft.onSale == true, "NFT not currently listed for sale");

        // Ensure that the buyer sends the exact amount of ether required to purchase the NFT
        require(
            msg.value == nft.price + LISTING_FEE,
            "Please send the exact amount of ether required to buy the NFT"
        );

        // Store the addresses of the seller and the buyer
        address payable seller = nft.seller;
        address payable buyer = payable(msg.sender);

        // Transfer ownership of the NFT from the marketplace to the buyer
        IERC721(_nftContract).transferFrom(address(this), buyer, nft.tokenId);

        // Send the payment to the seller
        (bool sent, ) = seller.call{value: nft.price}("");
        require(sent, "Failed to send ether to seller");

        // Transfer the listing fee to the marketplace owner
        _marketOwner.transfer(LISTING_FEE);

        // Update the NFT struct with the new owner and set the onSale variable to false
        nft.owner = buyer;
        nft.onSale = false;

        // Emit an event to notify listeners that the NFT was sold
        emit NFTSold(_nftContract, nft.tokenId, seller, buyer, nft.price);

        // Remove the NFT from the marketplace
        delete _idToNFT[_tokenId];
    }

        
   function resellNft(uint256 _tokenId, uint256 _newPrice) external {
        // Get the NFT struct for the specified token ID
        NFT storage nft = _idToNFT[_tokenId];

        // Ensure that the caller is the current owner of the NFT
        require(nft.owner == msg.sender, "You do not own this NFT");

        // Ensure that the NFT is currently on sale
        require(nft.onSale, "NFT not currently listed for sale");

        // Ensure that the new price is greater than 0
        require(_newPrice > 0, "New price must be greater than 0");

        // Ensure that the new price is different from the current price
        require(_newPrice != nft.price, "New price must be different from current price");

        // Calculate the commission
        uint256 commission = (_newPrice * 10) / 100;

        // Transfer the NFT back to the seller
        IERC721(nft.nftContract).safeTransferFrom(address(this), nft.seller, _tokenId);

        // Transfer the funds from the buyer to the seller
        (bool sent, ) = nft.owner.call{value: _newPrice}("");
        require(sent, "Failed to send ether to seller");

        // Transfer the commission to the owner of the marketplace contract
        _marketOwner.transfer(commission);

        // Update the NFT struct with the new price and seller
        nft.price = _newPrice;
        nft.seller = payable(msg.sender);
        nft.onSale = true;

        // Emit an event to notify listeners that the NFT's details have been updated
        emit NFTDetailsUpdated(nft.owner, nft.seller, nft.price);

        // Emit an event to notify listeners that the NFT has been listed for sale
        emit NFTListed(nft.nftContract, nft.tokenId, nft.seller, address(this), nft.price);
    }


    function getListingFee() public view returns (uint256) {
        // Returns the listing fee charged by the marketplace to list an NFT.
        return LISTING_FEE;
    }

   function getListedNfts() public view returns (NFT[] memory) {
    // Get the total number of NFTs in the marketplace
    uint256 nftCount = _tokenIdCounter.current();

    // Create an array to hold the NFTs listed for sale
    NFT[] memory nfts = new NFT[](nftCount);
    uint256 nftsIndex = 0;

    // Loop through all NFTs and add the ones listed for sale to the array
    for (uint256 i = 1; i <= nftCount; i++) {
        if (_idToNFT[i].onSale) {
            nfts[nftsIndex] = _idToNFT[i];
            nftsIndex++;
        }
    }

    // Return the array of NFTs listed for sale
    return nfts;
}


  function getMyNfts() public view returns (NFT[] memory) {
    // Get the total number of NFTs in the marketplace
    uint256 nftCount = _tokenIdCounter.current();

    // Count how many NFTs the caller owns
    uint256 myNftCount = 0;
    for (uint256 i = 1; i <= nftCount; i++) {
        if (_idToNFT[i].owner == msg.sender) {
            myNftCount++;
        }
    }

    // Create an array to hold the caller's NFTs
    NFT[] memory nfts = new NFT[](myNftCount);
    uint256 nftsIndex = 0;

    // Loop through all NFTs and add the ones owned by the caller to the array
    for (uint256 i = 1; i <= nftCount; i++) {
        if (_idToNFT[i].owner == msg.sender) {
            nfts[nftsIndex] = _idToNFT[i];
            nftsIndex++;
        }
    }

    // Return the array of the caller's NFTs
    return nfts;
}


   function getMyListedNfts() public view returns (NFT[] memory) {
        // Get the total number of NFTs in the marketplace
        uint256 nftCount = _tokenIdCounter.current();

        // Count how many NFTs the caller has listed for sale
        uint256 myListedNftCount = 0;
        for (uint256 i = 1; i <= nftCount; i++) {
            if (_idToNFT[i].seller == msg.sender && _idToNFT[i].onSale) {
                myListedNftCount++;
            }
        }

        // Create an array to hold the caller's NFTs listed for sale
        NFT[] memory nfts = new NFT[](myListedNftCount);
        uint256 nftsIndex = 0;

        // Loop through all NFTs and add the ones listed for sale by the caller to the array
        for (uint256 i = 1; i <= nftCount; i++) {
            if (_idToNFT[i].seller == msg.sender && _idToNFT[i].onSale) {
                nfts[nftsIndex] = _idToNFT[i];
                nftsIndex++;
            }
        }

        // Return the array of the caller's NFTs listed for sale
        return nfts;
    }

}