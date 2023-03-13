import React, { useState, useEffect } from 'react';
import Plot from '../Plot';
import './Map.css';
import generatePlots from './generateplots';
import Loading from 'react-loading-components';
import MapGuide from '../MapGuide/MapGuide';

const Map = ({ backendData,setBackendData, marketPlace, userType, web3 }) => {
  const num = 100; //can be 20 or 100
  const plots = generatePlots(backendData, num);
  const [loading, setLoading] = useState(true);

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
          <Plot
            {...plot}
            onClick={() => handlePlotClick(plot.id)}
            backendData={backendData}
            marketPlace={marketPlace}
            userType={userType}
            web3={web3}
            setBackendData={setBackendData}
          />
        </td>
      );
    }

    plotTable.push(<tr key={i}>{row}</tr>);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // set the loading state to false after 2 seconds
  }, []);

  return (
    <div className="Map">
      {loading ? (
        <div className="loading">
          <Loading type="spinning_circles" width={100} height={100} fill="#040123" />
          <h5>Loading, please wait...</h5>
        </div>
      ) : (<>
        <MapGuide/>
        <table>
          <tbody>{plotTable}</tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default Map;
