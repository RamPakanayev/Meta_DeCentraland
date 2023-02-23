var FlatNFT = artifacts.require("FlatNFT");
var Marketplace = artifacts.require("Marketplace");

var accounts;
web3.eth.getAccounts().then(function(response) { accounts = response; console.log(accounts[0]); });

const main = async (cb) => {
  try {
    const flats = await FlatNFT.deployed()
    const marketplace = await Marketplace.deployed()

    console.log('MINT AND LIST ALL NFTs')
    let listingFee = await marketplace.getListingFee()
    listingFee = listingFee.toString()
    let txn1 = await flats.safeMint(accounts[0] , "URI2") // By default, Truffle uses the first account available to execute functions.
    let tokenId1 = txn1.logs[2].args[0].toNumber()
    await marketplace.listNft(flats.address, tokenId1, 1, {value: listingFee})
    console.log(`Minted and listed ${tokenId1}`)
    //console.log('RESELL 1 NFT:')
    //await marketplace.resellNft(flats.address, tokenId2, 1, {value: listingFee})

    let getListOfNFT = await marketplace.getListedNfts.call();
    //console.log(`TotalIDs: ${getListOfNFT.length}`)
    //console.log(`IDs: ${getListOfNFT.id} Address: ${getListOfNFT}`)

    var text;

    for (let i = 0; i < getListOfNFT.length; i++) {
        text += `ID:${getListOfNFT[i][1]} || ` + getListOfNFT[i] + "\n";
    }
    console.log(`${text}`)

    } catch(err) {
    console.log('Doh! ', err);
  }
  cb();
  }

  module.exports = main;