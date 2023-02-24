// import TruffleContract from 'truffle-contract';
// plotsData.js
const generatePlots = (flatNft) => {
  console.log("render");
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

  const plots = Array(10000)
    .fill()
    .map((_, i) => {
      const id = i + 1;
      const x = i % 100;
      const y = Math.floor(i / 100);
      const type = getPlotType(x, y);
      const nftId = null;
      
      //ill need to deploy the flat and the marketplace json files and attach the nft id for each plot 
      // const nftId =  (type==='regular')? do mint : null;
      const owner = null;
      const game = null;
      const price =(type==='regular')? Math.floor(Math.random() * 101) + 100 : null;  // Set a random price between 100 and 200 to regular plots
      return { id, nftId,type, owner, game, price, x, y };
    });

    //maybe map again the whole 
  return plots;
};

export default generatePlots;
