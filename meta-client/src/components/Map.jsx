import React from 'react';
import Plot from './Plot';
import './Map.css';

const Map = ({ backendData }) => {
  const num=100;//can be num or 100
  const generatePlots = () => {
    const plots = Array(num*num)
      .fill()
      .map((_, i) => {
        const id = i + 1;
        const x = i % num;
        const y = Math.floor(i / num);
        const plotbackendData = backendData.find((plot) => plot.x === x && plot.y === y);
        const type = plotbackendData ? plotbackendData.type : 'regular';
        const owner = plotbackendData ? plotbackendData.owner : null;
        const game = plotbackendData ? plotbackendData.game : null;
        const price = plotbackendData ? plotbackendData.price : Math.floor(Math.random() * 101) + 100;
        const forSale = plotbackendData ? plotbackendData.forSale : 'yes';
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
