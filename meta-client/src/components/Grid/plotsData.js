// This function generates data for the plots
const generatePlots = async (flatNft, web3) => {
  // console.log('in the generatePlots');
  // Check if the flatNft or web3 arguments are missing
  if (!flatNft || !web3) {
    return;
  }

  // Create a new contract instance using the flatNft ABI and address
  const flatNftContract = new web3.eth.Contract(flatNft.abi, flatNft.address);
  
  // The address of the account that will be used to mint new NFTs
    // get accounts straight from Ganache using the following:
  var accounts;
  accounts = (await web3.eth.getAccounts())
  const mintingAccount = accounts[0]; // Replace with your own account address. Owner by default is in array 0.
  
  // An array to store the minting account for each regular plot
  const regularPlots = [];

  // Determine the type of plot based on its position
  const getPlotType = (x, y) => {
    if (
      (x > 15 && x < 35 && y > 25 && y < 65) ||
      (x > 60 && x < 80 && y > 10 && y < 30) ||
      (x > 60 && x < 80 && y > 60 && y < 80)
    ) {
      // First/last 10 rows are parks
      return 'park';
    } else if (
      (x === 15 && y < 65) ||
      (x === 35 && y > 25) ||
      (y === 25 && x <= 35) ||
      (y === 65 && x >= 15) ||
      (x === 60) ||
      (x === 80 && y > 10 && y < 80) ||
      (y === 80 && x < 81) ||
      (y === 10 && x <= 80) ||
      (y === 30 && x >= 60) ||
      (y === 60 && x >= 60 && x < 80) ||
      (x === 0) ||
      (x === 99) ||
      (y === 0) ||
      (y === 99)
    ) {
      // Rows 2-97 on the sides are roads
      return 'road';
    } else {
      return 'regular';
    }
  };

  // Loop through all plots and add the minting account to the regularPlots array for regular plots
  for (let i = 0; i < 10000; i++) {
    if (i / 1000 === 0) {
      console.log(i);
    }
    const id = i + 1;
    const x = i % 100;
    const y = Math.floor(i / 100);
    const type = getPlotType(x, y);

    if (type === "regular") {
      regularPlots.push(mintingAccount);
    }
  }

  // Mint new regular NFTs for the regular plots
  const receipt = await flatNftContract.methods.safeBatchMint(regularPlots, []).send({ from: mintingAccount });

  // Get the IDs of the newly minted regular NFTs
  const regularNftIds = receipt.events.Transfer ? receipt.events.Transfer.map(event => event.returnValues.tokenId) : [];

  // Create an array to store the plot data
 const plots = [];
  for (let i = 0; i < 10000; i++) {
    const id = i + 1;
    const x = i % 100;
    const y = Math.floor(i / 100);
    const type = getPlotType(x, y);

    let nftId = null;
    if (type === "regular") {
      nftId = regularNftIds.shift();
    }

    const owner = null;
    const game = null;

    // For regular plots, set onSale to true
    const onSale = type === "regular" ? true : false;
    // For regular plots, generate a random price between 100 and 200
    const price = type === "regular" ? Math.floor(Math.random() * 101) + 100 : null;
    plots.push({ id, nftId, type, owner, game, onSale, price, x, y });
  }


  // Return the plots array
  return plots;
};

export default generatePlots;


/*The `generatePlots` function generates plot data for the decentralized game using the `flatNft` and `web3` arguments. It creates new NFTs for regular plots and assigns each plot its corresponding NFT ID. The function determines the type of plot based on its position, and generates a random price for regular plots.

The function loops through all 10,000 plots, and for each plot:
- It determines the plot's x and y coordinates, and its type (park, road, or regular).
- If the plot is a regular plot, it adds the minting account to the `regularPlots` array.
- It generates an object containing the plot data, including its ID, type, owner, game, price, and coordinates.
- If the plot is a regular plot, it assigns it the ID of the corresponding newly minted regular NFT.

After the loop, the function returns an array of objects representing the plots.*/