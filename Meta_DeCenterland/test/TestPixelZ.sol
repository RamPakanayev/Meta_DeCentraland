// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PixelZ.sol";

contract TestPixelZ {

  function testInitialBalanceUsingDeployedContract() public {
    PixelZ meta = PixelZ(DeployedAddresses.PixelZ());

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 PixelZ initially");
  }

  function testInitialBalanceWithNewPixelZ() public {
    PixelZ meta = new PixelZ();

    uint expected = 10000;

    Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 PixelZ initially");
  }

}
