import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';

const getColor = (type) => {
  switch (type) {
    case 'park':
      return 'green';
    case 'road':
      return 'rgb(58, 56, 56)';
    default:
      return 'rgb(196, 196, 197)';
  }
};

const Plot = ({ id, type, owner, game, price, x, y }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleClick = () => {
    if (type === 'regular') {
      setShowDetails(!showDetails);
    }
  };

  const handlePurchase = () => {
    if (type !== 'park' && type !== 'road') {
      setPurchased(true);
    }
  };

  const color = purchased ? 'red' : getColor(type);

  const plotStyle = {
    gridColumn: x,
    gridRow: y,
    backgroundColor: color,
    width: '7px',
    height: '7px',
    margin: 0,
    padding: 0,
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <div className="plot" style={plotStyle} onClick={handleClick}>
      {showDetails ? (
        <PopUpPlotDetails owner={owner} game={game} price={price} onClose={handleClose} />
      ) : null}
    </div>
  );
};

export default Plot;
