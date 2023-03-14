// SPDX-License-Identifier: MIT
// This contract is for our NFC
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; // Enums tokens and owners
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // store the tokenURIs on chain in storage, which is what allows us to store the metadata we upload to IPFS off-chain.
import "@openzeppelin/contracts/access/Ownable.sol"; // Allows me and Ram modify the contract
import "@openzeppelin/contracts/utils/Counters.sol"; // We use a counter to track the total number of NFTs and assign a unique token id to each NFT.

contract FlatNFT is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter; // might change to tokenID or tokenIdCounter if decide to keep counter
    address marketplaceContract;// The address of the marketplace contract where this NFT can be sold.
    event NFTMinted(uint256);// An event that is emitted when an NFT is minted.

// Constructor for the ERC721 contract, which sets the name and symbol of the NFT.
    constructor(address _marketplaceContract)
        ERC721("Meta DeCenterland", "MDCL")
    {
        marketplaceContract = _marketplaceContract;
    }

    // A function to safely mint an NFT and assign it to the specified address.
    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current(); // Get the current value of the token id counter.
        _tokenIdCounter.increment(); // Increment the token id counter to ensure that each NFT has a unique token id.
        _safeMint(to, tokenId); // Mint the NFT and assign it to the specified address.
        _setTokenURI(tokenId, uri); // Set the token URI for the NFT.
        setApprovalForAll(marketplaceContract, true); // Set the approval of the NFT to the marketplace contract so that it can be sold.
        emit NFTMinted(tokenId); // Emit the NFTMinted event with the new token id.
    }

    // A function to safely batch mint NFTs and assign them to the specified addresses.
    function safeBatchMint(address[] memory to, string[] memory uri) public onlyOwner {
        require(to.length == uri.length, "Arrays length mismatch"); // Check that the length of the to and uri arrays is the same.
        for (uint256 i = 0; i < to.length; i++) { // Loop through each element in the to and uri arrays.
            safeMint(to[i], uri[i]); // Mint the NFT and assign it to the specified address.
        }
        emit BatchMinted(to, uri); // Emit the BatchMinted event with the new token ids.
    }

    // Event emitted when a batch of NFTs is minted.
    event BatchMinted(address[] to, string[] uri);

    
    // The following functions are overrides required by Solidity.

    // Function that is called before a token is transferred..
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // Function to burn an NFT.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // Function to get the URI of an NFT.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // Function to check if a given interface is supported by this contract.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
