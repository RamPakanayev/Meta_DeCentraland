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
  const mintingAccount = "0x7BcEB50c0659D673b888FebFc72Eea0ABEabd42B"; // Replace with your own account address
  
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

    let tokenId = null;
    if (type === "regular") {
      tokenId = regularNftIds.shift();
    }

    const owner = null;
    const game = null;

    // For regular plots, set onSale to true
    const onSale = type === "regular" ? true : false;
    // For regular plots, generate a random price between 100 and 200
    const price = type === "regular" ? Math.floor(Math.random() * 101) + 100 : null;
    plots.push({ id, tokenId, type, owner, game, onSale, price, x, y });
  }


  // Return the plots array
  return plots;
};

export default generatePlots;


