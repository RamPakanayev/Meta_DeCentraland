// SPDX-License-Identifier: MIT
// This contract is for our Token
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PixelZ is ERC20 {
    constructor() ERC20("PixelZ", "Pz") {}
}
