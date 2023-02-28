const generatePlots = async (flatNft, web3) => {
  console.log('in the generatePlots');
  if (!flatNft || !web3) {
    return;
  }

  const flatNftContract = new web3.eth.Contract(flatNft.abi, flatNft.address);
  const mintingAccount = "0x8da101437B2Aa839c1811e4Efe19Db30D4d2Bc54"; // Replace with your own account address
  const regularPlots = [];

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

  for (let i = 0; i < 10000; i++) {
    console.log(i);
    const id = i + 1;
    const x = i % 100;
    const y = Math.floor(i / 100);
    const type = getPlotType(x, y);

    if (type === "regular") {
      regularPlots.push(mintingAccount);
    }
  }

  const receipt = await flatNftContract.methods.safeBatchMint(regularPlots, []).send({ from: mintingAccount });

  const regularNftIds = receipt.events.Transfer ? receipt.events.Transfer.map(event => event.returnValues.tokenId) : [];


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
    const price = type === "regular" ? Math.floor(Math.random() * 101) + 100 : null;
    plots.push({ id, nftId, type, owner, game, price, x, y });
  }

  return plots;
};

export default generatePlots;
