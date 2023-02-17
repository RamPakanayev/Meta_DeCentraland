import React from 'react';
import Plot from '../Plot';
import generatePlots from './plotsData20';
import './Grid20.css';


const Grid20 = ({ userType }) => {
  // generate the plots and create a table of Plot components
  const plots = generatePlots();
  const plotTable = [];

  for (let i = 0; i < 20; i++) {
    const row = [];

    for (let j = 0; j < 20; j++) {
      const index = i * 20 + j;
      row.push(
        <td key={`${j}-${i}`}>
          <Plot {...plots[index]} userType={userType} />
        </td>
      );
    }

    plotTable.push(<tr key={i}>{row}</tr>);
  }

  // render the grid with the table of Plot components
  return (
    <div className="grid20">
      <table>
        <tbody>{plotTable}</tbody>
      </table>
    </div>
  );
};

export default Grid20;

