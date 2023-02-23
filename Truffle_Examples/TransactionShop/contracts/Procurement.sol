// SPDX-License-Identifier: Get rid of annoying remark
pragma solidity ^0.5.16;

contract Procurement {
    address[16] public realtors; // array of Ethereum addresses

    function buy(uint256 pixelID) public returns (uint256) {
        require(pixelID >= 0 && pixelID <= 15);

        realtors[pixelID] = msg.sender;

        return pixelID;
    }

    // Retrieving the realtors
    function getBuyers() public view returns (address[16] memory) {
        return realtors;
    }
}
