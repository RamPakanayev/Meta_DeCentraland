// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _nftsSold;
    Counters.Counter private _tokenIdCounter;
    uint256 public LISTING_FEE = 0.0001 ether;
    address payable private _marketOwner;
    mapping(uint256 => NFT) private _idToNFT;
    struct NFT {
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool onSale;
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
    struct OwnershipHistory {
        address buyer;
        address seller;
        uint256 price;
        uint256 timestamp;
    }


    constructor() {
        _marketOwner = payable(msg.sender);
    }

    function listNft(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public payable nonReentrant {
        require(_price > 0, "Price must be at least 1 wei");
        require(msg.value == LISTING_FEE, "Not enough ether for listing fee");

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        _idToNFT[tokenId] = NFT(
            _nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            _price,
            true
        );

        emit NFTListed(_nftContract, tokenId, msg.sender, address(this), _price);
    }

    event NFTDetailsUpdated(address indexed owner, address indexed seller, uint256 price);


  function buyNft(address _nftContract, uint256 _tokenId) public payable nonReentrant {
    NFT storage nft = _idToNFT[_tokenId];
    require(nft.onSale == true, "NFT not currently listed for sale");
    require(
        msg.value == nft.price + LISTING_FEE,
        "Please send the exact amount of ether required to buy the NFT"
    );

    address payable seller = nft.seller;
    address payable buyer = payable(msg.sender);

    IERC721(_nftContract).transferFrom(address(this), buyer, nft.tokenId);

    (bool sent, ) = seller.call{value: nft.price}("");
    require(sent, "Failed to send ether to seller");

    _marketOwner.transfer(LISTING_FEE);
    nft.owner = buyer;

    // Save the ownership history for the NFT
    addOwnershipHistory(nft.tokenId, buyer, seller, nft.price, block.timestamp);

    emit NFTSold(_nftContract, nft.tokenId, seller, buyer, nft.price);

    // Set the onSale variable to false
    nft.onSale = false;

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

        emit NFTDetailsUpdated(nft.owner, nft.seller, nft.price);
        emit NFTListed(nft.nftContract, nft.tokenId, nft.seller, address(this), nft.price);
    }


    function getListingFee() public view returns (uint256) {
        return LISTING_FEE;
    }

    function getListedNfts() public view returns (NFT[] memory) {
        uint256 nftCount = _tokenIdCounter.current();

        NFT[] memory nfts = new NFT[](nftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 1; i <= nftCount; i++) {
            if (_idToNFT[i].onSale) {
                nfts[nftsIndex] = _idToNFT[i];
                nftsIndex++;
            }
        }
        return nfts;
    }

    function getMyNfts() public view returns (NFT[] memory) {
        uint256 nftCount = _tokenIdCounter.current();
        uint256 myNftCount = 0;
        for (uint256 i = 1; i <= nftCount; i++) {
            if (_idToNFT[i].owner == msg.sender) {
                myNftCount++;
            }
        }

        NFT[] memory nfts = new NFT[](myNftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 1; i <= nftCount; i++) {
            if (_idToNFT[i].owner == msg.sender) {
                nfts[nftsIndex] = _idToNFT[i];
                nftsIndex++;
            }
        }
        return nfts;
    }

    function getMyListedNfts() public view returns (NFT[] memory) {
        uint256 nftCount = _tokenIdCounter.current();
        uint256 myListedNftCount = 0;
        for (uint256 i = 1; i <= nftCount; i++) {
            if (
                _idToNFT[i].seller == msg.sender && _idToNFT[i].onSale
            ) {
                myListedNftCount++;
            }
        }

        NFT[] memory nfts = new NFT[](myListedNftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 1; i <= nftCount; i++) {
            if (
                _idToNFT[i].seller == msg.sender && _idToNFT[i].onSale
            ) {
                nfts[nftsIndex] = _idToNFT[i];
                nftsIndex++;
            }
        }
        return nfts;
    }
    mapping(uint256 => OwnershipHistory[]) private _nftOwnershipHistory;

    function addOwnershipHistory(uint256 _tokenId, address _buyer, address _seller, uint256 _price, uint256 _timestamp) private {
        _nftOwnershipHistory[_tokenId].push(OwnershipHistory(_buyer, _seller, _price, _timestamp));
    }

    function getOwnershipHistory(uint256 _tokenId) public view returns (OwnershipHistory[] memory) {
        return _nftOwnershipHistory[_tokenId];
    }


   function transferFrom(address _from, address _to, uint256 _tokenId) public {
        // Call the transferFrom function from the ERC721 contract
        IERC721(_idToNFT[_tokenId].nftContract).transferFrom(_from, _to, _tokenId);

        // Add the new owner to the ownership history
        addOwnershipHistory(
            _tokenId, 
            _to, 
            _idToNFT[_tokenId].seller, 
            _idToNFT[_tokenId].price, 
            block.timestamp
        );
    }
}