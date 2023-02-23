const express = require("express");
const app = express();
const jsn = require("./Meta_DeCentraland_Plots.json");
const fs = require("fs");
const Web3 = require("web3");

// Serve the Meta_DeCentraland_Plots.json file
app.get("/api", (req, res) => {
    res.json({ data: jsn });
});

// Set up Web3 and the Marketplace contract instance
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Replace this with the actual RPC endpoint of your Ethereum node
const marketplaceJSON = JSON.parse(fs.readFileSync("./build/contracts/Marketplace.json", "utf8"));
const marketplaceAddress = "0x63710a4855b055ef95585B6E2341949287cB177a"; // Replace this with the actual deployed contract address
const marketplaceABI = marketplaceJSON.abi;
const marketplaceContractInstance = new web3.eth.Contract(marketplaceABI, marketplaceAddress);

app.get("/marketplace", async (req, res) => {
  try {
    const marketplaceDetails = {
      address: marketplaceAddress,
      abi: marketplaceABI,
      functions: Object.keys(marketplaceContractInstance.methods),
      variables: Object.keys(marketplaceContractInstance.events),
    };
    res.json(marketplaceDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // Set up Web3 and the FlatNFT contract instance
// const flatNFTJSON = JSON.parse(fs.readFileSync("./build/contracts/FlatNFT.json", "utf8"));
// const flatNFTAddress = "0x726fc3Aa434f53e2698ad2fa32437CB167bfADc2";
// const flatNFTABI = flatNFTJSON.abi;
// const flatNFTContractInstance = new web3.eth.Contract(flatNFTABI, flatNFTAddress);

// // Add the FlatNFT token ID to each plot object
// async function addFlatNFTTokenIds() {
//   for (let i = 0; i < jsn.length; i++) {
//     const plot = jsn[i];
//     const tokenURI = await flatNFTContractInstance.methods.tokenURI(i).call();
//     const tokenId = parseInt(tokenURI.substring(tokenURI.lastIndexOf("/") + 1));
//     plot.flatNFTTokenId = tokenId;
//   }
// }

// // Call the function to add the FlatNFT token ID to each plot object
// addFlatNFTTokenIds();

// // Serve the FlatNFT contract ABI and bytecode as a JSON file
// app.get("/flatnft", (req, res) => {
//   const flatNFTFile = fs.readFileSync("./build/contracts/FlatNFT.json");
//   const flatNFTJSON = JSON.parse(flatNFTFile);
//   res.json(flatNFTJSON);
// });

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
