var FlatNFT = artifacts.require("FlatNFT");
var Marketplace = artifacts.require("Marketplace");

var accounts;
web3.eth.getAccounts().then(function(response) { accounts = response; console.log(accounts[0]); });

const main = async (cb) => {
  try {
    const users = await web3.eth.getAccounts();
    const flats = await FlatNFT.deployed()
    const marketplace = await Marketplace.deployed()

    console.log('MINT AND LIST ALL NFTs')
    let listingFee = await marketplace.getListingFee()
    listingFee = listingFee.toString()
    let txn1 = await flats.safeMint(users[0] , "URI1") // By default, Truffle uses the first account ID 0 as Owner.
    let tokenId1 = txn1.logs[2].args[0].toNumber()
    await marketplace.listNft(flats.address, tokenId1, 1, {value: listingFee})
    console.log(`Minted and listed ${tokenId1}`)
    
    //console.log('RESELL 1 NFT:')
    //await marketplace.resellNft(flats.address, tokenId2, 1, {value: listingFee})

    let getListOfNFT = await marketplace.getListedNfts.call();
    //console.log(`TotalIDs: ${getListOfNFT.length}`)
    //console.log(`IDs: ${getListOfNFT.id} Address: ${getListOfNFT}`)

    var text = "";
    for (let i = 0; i < getListOfNFT.length; i++) {
        text += `ID:${getListOfNFT[i][1]} || ` + getListOfNFT[i] + "\n";
    }
    console.log(`${text}`)

    // console.log(`Address of owner's wallet: ${accounts[0]}`)
    // console.log(`Address of NFT: ${FlatNFT.address} `)
    // console.log(`Address of Marketplace: ${Marketplace.address} `)

    console.log(`For user ${users[0]}:`)
    var textForNFT;
    let tokens = await flats.tokensOfOwner(users[0]);
    console.log("Owner has tokens: \n", tokens);

    } catch(err) {
    console.log('Doh! ', err);
  }
  cb();
  }

  module.exports = main;