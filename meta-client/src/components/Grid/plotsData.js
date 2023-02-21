// plotsData.js
const generatePlots = () => {
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
      const owner = null;
      const game = null;
      const price = Math.floor(Math.random() * 101) + 100; // Set a random price between 100 and 200
      return { id, type, owner, game, price, x, y };
    });

  return plots;
};

export default generatePlots;
