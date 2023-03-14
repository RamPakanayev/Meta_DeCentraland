// SPDX-License-Identifier: MIT
// This contract is for our Token
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PixelZ is ERC20, Ownable {
    address marketplaceContract;

    constructor(address _marketplaceContract) ERC20("PixelZ", "Pz") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
        marketplaceContract = _marketplaceContract;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
