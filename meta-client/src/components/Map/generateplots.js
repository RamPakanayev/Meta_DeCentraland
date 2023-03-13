/*This function takes in backendData and num as inputs and generates an array of plots
 with specific properties such as id, tokenId, type, owner, game, price, x, y, and forSale.*/

const generatePlots = (backendData,num) => {
  const plots = Array(num*num)
    .fill()
    .map((_, i) => {
      const id = i + 1;
      const plotbackendData = backendData.find((plot) => plot.id === id);
      const tokenId = plotbackendData ? plotbackendData.tokenId : 'tokenId';
      const x = plotbackendData ? plotbackendData.x : 'x';
      const y = plotbackendData ? plotbackendData.y : 'y';
      const type = plotbackendData ? plotbackendData.type : 'none';
      const owner = plotbackendData ? plotbackendData.owner : 'none';
      const game = plotbackendData ? plotbackendData.game : 'none';
      const price = plotbackendData ? plotbackendData.price : 'none';
      const forSale = plotbackendData ? plotbackendData.onSale : 'none';
      return { id,tokenId, type, owner, game, price, x, y, forSale };
    });

  return plots;
};
export default generatePlots

