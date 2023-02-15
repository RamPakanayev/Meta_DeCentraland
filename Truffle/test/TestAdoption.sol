pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Procurement.sol";

contract TestProcurement {
    // The address of the Procurement contract to be tested
    Procurement procurement = Procurement(DeployedAddresses.Procurement());

    // The id of the pixel that will be used for testing
    uint256 expectePixelId = 8;

    //The expected owner of adopted pixel is this contract
    address expectedAdopter = address(this);

    // Testing the buy() function
    function testUserCanBuyPixel() public {
        uint256 returnedId = procurement.buy(expectePixelId);

        Assert.equal(
            returnedId,
            expectePixelId,
            "Procurement of the expected pixel should match what is returned."
        );
    }

    // Testing retrieval of a single pixel's owner
    function testGetAdopterAddressByPixelId() public {
        address adopter = procurement.realtors(expectePixelId);

        Assert.equal(
            adopter,
            expectedAdopter,
            "Owner of the expected pixel should be this contract"
        );
    }

    // Testing retrieval of all pixel owners
    function testGetAdopterAddressByPixelIdInArray() public {
        // Store realtors in memory rather than contract's storage
        address[16] memory realtors = procurement.getBuyers();

        Assert.equal(
            realtors[expectePixelId],
            expectedAdopter,
            "Owner of the expected pixel should be this contract"
        );
    }
}
