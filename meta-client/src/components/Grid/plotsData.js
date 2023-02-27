import Web3 from 'web3'

const generatePlots = async (flatNft, web3) => {
  if (!flatNft) {
    return;
  }

  const flatNftContract = new web3.eth.Contract(flatNft.abi, flatNft.address);
  const mintingAccount = "0x567ED905eFdD4eD8De787A2f12248ED267B0834f"; // Replace with your own account address
  const regularNftIds = [];

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

  const plots = await Promise.all(
    Array(10000)
      .fill()
      .map(async (_, i) => {
        const id = i + 1;
        const x = i % 100;
        const y = Math.floor(i / 100);
        const type = getPlotType(x, y);

        let nftId = null;
        if (type === "regular") {
          const receipt = await flatNftContract.methods.safeMint(mintingAccount, "").send({ from: mintingAccount });
          nftId = receipt.events.Transfer.returnValues[2];
          regularNftIds.push(nftId);
        }

        const owner = null;
        const game = null;
        const price = type === "regular" ? Math.floor(Math.random() * 101) + 100 : null;
        return { id, nftId, type, owner, game, price, x, y };
      })
  );

  return plots.map((plot) => {
    if (plot.type === "regular") {
      plot.nftId = regularNftIds.shift();
    } else {
      plot.nftId = null;
    }
    return plot;
  });
};

export default generatePlots;
