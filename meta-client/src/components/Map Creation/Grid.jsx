import React from 'react';
import Plot from '../Plot';
import generatePlots from './MapAndNFTGenerator';
import './Grid.css';

const Grid = ({ userType }) => {
  const plots = generatePlots();
  const plotTable = [];

  for (let i = 0; i < 100; i++) {
    const row = [];

    for (let j = 0; j < 100; j++) {
      const index = i * 100 + j;
      row.push(
        <td key={`${j}-${i}`}>
          <Plot {...plots[index]} userType={userType} />
        </td>
      );
    }
    plotTable.push(<tr key={i}>{row}</tr>);
  }

  return (
    <div className="GridMap">
      <table>
        <tbody>{plotTable}</tbody>
      </table>
    </div>
  );
};

export default Grid;
