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
    address marketplaceContract;
    event NFTMinted(uint256);

    constructor(address _marketplaceContract)
        ERC721("Meta DeCenterland", "MDCL")
    {
        marketplaceContract = _marketplaceContract;
    }

    // function mint(string memory _tokenURI) public {
    //     _tokenIds.increment();
    //     uint256 newTokenId = _tokenIds.current();
    //     _safeMint(msg.sender, newTokenId);
    //     _setTokenURI(newTokenId, _tokenURI);
    //     setApprovalForAll(marketplaceContract, true);
    //     emit NFTMinted(newTokenId);
    // }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        setApprovalForAll(marketplaceContract, true);
        emit NFTMinted(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
