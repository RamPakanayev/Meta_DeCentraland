import React from 'react';
import Plot from '../Plot';
import './Map.css';
import generatePlots from './generateplots';

const Map = ({ backendData }) => {
  const num=100;//can be 20 or 100
  const plots = generatePlots(backendData,num);

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
