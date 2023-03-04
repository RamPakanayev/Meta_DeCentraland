// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _nftsSold;
    Counters.Counter private _nftCount;
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
    event NFTDetailsUpdated(
    address owner,
    address seller,
    uint256 price
);


    constructor() {
        _marketOwner = payable(msg.sender);
    }

    // List the NFT on the marketplace
 function listNft(
    address _nftContract,
    uint256 _tokenId,
    uint256 _price
) public payable nonReentrant {
    require(_price > 0, "Price must be at least 1 wei");
    require(msg.value == LISTING_FEE, "Not enough ether for listing fee");

    IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

    _nftCount.increment();

    _idToNFT[_tokenId] = NFT(
        _nftContract,
        _tokenId,
        payable(msg.sender),
        payable(address(this)),
        _price,
        true
    );

    emit NFTListed(_nftContract, _tokenId, msg.sender, address(this), _price);
}


    function getNftDetails(uint256 _tokenId) public view returns (
    address nftContract,
    uint256 tokenId,
    address seller,
    address owner,
    uint256 price,
    bool onSale
) {
    NFT storage nft = _idToNFT[_tokenId];
    require(nft.owner != address(0), "Invalid token ID");
    nftContract = nft.nftContract;
    tokenId = nft.tokenId;
    seller = nft.seller;
    owner = nft.owner;
    price = nft.price;
    onSale = nft.onSale;
}


    // Buy an NFT
 function buyNft(address _nftContract, uint256 _tokenId, uint256 _price)
    public
    payable
    nonReentrant
{
    NFT storage nft = _idToNFT[_tokenId];
    require(
        nft.onSale == true,
        "NFT not currently listed for sale"
    );
    require(
        msg.value == _price + LISTING_FEE,
        "Please send the exact amount of ether required to buy the NFT"
    );

    address payable buyer = payable(msg.sender);
    payable(nft.seller).transfer(_price);
    IERC721(_nftContract).transferFrom(address(this), buyer, nft.tokenId);
    _marketOwner.transfer(LISTING_FEE);
    nft.owner = buyer;
    nft.onSale = false;

    _nftsSold.increment();
    emit NFTSold(_nftContract, nft.tokenId, nft.seller, buyer, _price);

    // Set the onSale variable to false
    nft.onSale = false;
}




    // Resell an NFT purchased from the marketplace
  
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
        uint256 nftCount = _nftCount.current();
        uint256 unsoldNftsCount = nftCount - _nftsSold.current();

        NFT[] memory nfts = new NFT[](unsoldNftsCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (_idToNFT[i + 1].onSale) {
                nfts[nftsIndex] = _idToNFT[i + 1];
                nftsIndex++;
            }
        }
        return nfts;
}
    function getMyNfts() public view returns (NFT[] memory) {
        uint256 nftCount = _nftCount.current();
        uint256 myNftCount = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (_idToNFT[i + 1].owner == msg.sender) {
                myNftCount++;
            }
        }

        NFT[] memory nfts = new NFT[](myNftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (_idToNFT[i + 1].owner == msg.sender) {
                nfts[nftsIndex] = _idToNFT[i + 1];
                nftsIndex++;
            }
        }
        return nfts;
    }

    function getMyListedNfts() public view returns (NFT[] memory) {
        uint256 nftCount = _nftCount.current();
        uint256 myListedNftCount = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (
                _idToNFT[i + 1].seller == msg.sender && _idToNFT[i + 1].onSale
            ) {
                myListedNftCount++;
            }
        }

        NFT[] memory nfts = new NFT[](myListedNftCount);
        uint256 nftsIndex = 0;
        for (uint256 i = 0; i < nftCount; i++) {
            if (
                _idToNFT[i + 1].seller == msg.sender && _idToNFT[i + 1].onSale
            ) {
                nfts[nftsIndex] = _idToNFT[i + 1];
                nftsIndex++;
            }
        }
        return nfts;
    }
}