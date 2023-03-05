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

// Get information about the deployed Marketplace smart contract
app.get("/api/marketplace", async (req, res) => {
  try {
    const marketplaceDetails = {
      address: marketplaceAddress,
      abi: marketplaceABI,
      functions: Object.keys(marketplaceContractInstance.methods),
      events: Object.keys(marketplaceContractInstance.events),
    };
    res.json(marketplaceDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const flatNftJSON = JSON.parse(fs.readFileSync("./build/contracts/flatNFT.json", "utf8"));
const flatNftAddress = "0x726fc3Aa434f53e2698ad2fa32437CB167bfADc2"; // Replace this with the actual deployed contract address
const flatNftABI = flatNftJSON.abi;
const flatNftContractInstance = new web3.eth.Contract(flatNftABI, flatNftAddress);


// Serve the flatNFT.json file
app.get("/api/flatNFT", async (req, res) => {
  try {
    const flatNftDetails = {
      address: flatNftAddress,
      abi: flatNftABI,
      functions: Object.keys(flatNftContractInstance.methods),
      events: Object.keys(flatNftContractInstance.events),
    };
    res.json(flatNftDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update the game property in the Meta_DeCentraland_Plots.json file
app.post("/api/updateGame", async (req, res) => {
  try {
    const { id, gameUrl } = req.body;

    // Find the plot with the specified ID in the JSON file
    const plotIndex = jsn.findIndex((plot) => plot.id === id);
    if (plotIndex === -1) {
      res.status(404).json({ error: `No plot found with ID ${id}` });
      return;
    }

    // Update the game property for the plot and save the changes to the JSON file
    jsn[plotIndex].game = gameUrl;
    fs.writeFileSync("./Meta_DeCentraland_Plots.json", JSON.stringify(jsn, null, 2));

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(5001, () => {
  console.log("Server started on port 5001");
});