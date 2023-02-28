const generatePlots = (backendData,num) => {
  const plots = Array(num*num)
    .fill()
    .map((_, i) => {
      const id = i + 1;
      const plotbackendData = backendData.find((plot) => plot.id === id);
      const x = plotbackendData ? plotbackendData.x : 'x';
      const y = plotbackendData ? plotbackendData.y : 'y';
      const type = plotbackendData ? plotbackendData.type : 'none';
      const owner = plotbackendData ? plotbackendData.owner : 'none';
      const game = plotbackendData ? plotbackendData.game : 'none';
      const price = plotbackendData ? plotbackendData.price : 'none';
      const forSale = plotbackendData ? plotbackendData.onSale : 'none';// replace with onSale
      return { id, type, owner, game, price, x, y, forSale };
    });

  return plots;
};
export default generatePlots

