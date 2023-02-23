const generatePlots = () => {
  // utility function to determine the plot type based on its position
  const getPlotType = (x, y) => {
    if (
      (x > 3 && x < 16 && y > 4 && y < 16) ||
      (x > 0 && x < 5 && y > 0 && y < 5) ||
      (x > 14 && x < 20 && y > 0 && y < 5) ||
      (x > 0 && x < 5 && y > 14 && y < 20) ||
      (x > 14 && x < 20 && y > 14 && y < 20)
    ) {
      // First/last 3 rows are parks
      return 'park';
    } else if (
      (x === 3 && y < 16) ||
      (x === 16 && y > 4) ||
      (y === 4 && x <= 16) ||
      (y === 16 && x >= 3) ||
      (x === 0) ||
      (x === 19 && y > 0 && y < 20) ||
      (y === 0) ||
      (y === 19 && x > 0 && x < 20)
    ) {
      // Rows 4-17 on the sides are roads
      return 'road';
    } else {
      // Everything else is a regular plot
      return 'regular';
    }
  };

  // create an array of plot objects
  const plots = Array(400)
    .fill()
    .map((_, i) => {
      const id = i + 1;
      const x = i % 20;
      const y = Math.floor(i / 20);
      const type = getPlotType(x, y);
      const owner = null;
      const game = null;
      const price = Math.floor(Math.random() * 101) + 100; // Set a random price between 100 and 200
      return { id, type, owner, game, price, x, y };
    });

  return plots;
};

export default generatePlots;
