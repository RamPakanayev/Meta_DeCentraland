import React from 'react';
import Plot from './Plot';
import './Map.css';

const Map = ({ backendData }) => {
  const num=100;//can be 20 or 100
  const generatePlots = () => {
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
        const forSale = plotbackendData ? plotbackendData.forSale : 'none';
        return { id, type, owner, game, price, x, y, forSale };
      });

    return plots;
  };

  const plots = generatePlots();

  const handlePlotClick = (plotId) => {
    console.log('Plot clicked:', plotId);
  };

  const plotTable = [];

  for (let i = 0; i < num; i++) {
    const row = [];

    for (let j = 0; j < num; j++) {
      const index = i * num + j;
      const plot = plots[index];

     
        row.push(
          <td key={`${j}-${i}`}>
            <Plot {...plot} onClick={() => handlePlotClick(plot.id)} backendData={backendData} />
          </td>)
     
    }

    plotTable.push(<tr key={i}>{row}</tr>);
  }

  return (
    
    <div className="Map">
      {backendData.length===0?(
        <p>Loading...</p>
      ):(
      <table>
        <tbody>{plotTable}</tbody>
      </table>)}
    </div>
  );
};


export default Map;
