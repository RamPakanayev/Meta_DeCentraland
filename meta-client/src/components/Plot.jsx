import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';

const Plot = ({ id, type, owner, game, price, x, y }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  let color;
  if (type === 'park') {
    color = 'green';
  } else if (type === 'road') {
    color = 'rgb(58, 56, 56)';
  } else {
    color = 'rgb(196, 196, 197)';
  }

  return (
    <div className={`plot plot-${type}`} style={{ backgroundColor: color, gridColumn: x, gridRow: y }} onClick={handleClick}>
      {showDetails ? (
        <PopUpPlotDetails owner={owner} game={game} price={price} onClose={handleClick} />
      ) : null}
    </div>
  );
};

export default Plot;
