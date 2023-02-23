pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract PixelzToken is ERC20 {
    string public name = "PixelZ";
    string public symbol = "PZ";
    uint8 public decimals = 2;
    uint256 public INITIAL_SUPPLY = 20000;
}

constructor() public {
    _mint(msg.sender, INITIAL_SUPPLY);
}
