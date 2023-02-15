import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';

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

  const handleClose = () => {
    setShowDetails(false);
  };

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

  const handleSetPrice = (event) => {
    // code to set price
  };

  const handleTransferOwnership = (event) => {
    // code to transfer ownership
  };

  const handleAttachGame = (event) => {
    // code to attach game
  };

  return (
    <div className="plot" style={plotStyle} onClick={handleClick}>
      {showDetails ? (
        <PopUpPlotDetails 
          id={id} 
          owner={owner} 
          game={game} 
          price={price} 
          onClose={handleClose} 
          onSetPrice={handleSetPrice}
          onTransferOwnership={handleTransferOwnership}
          onAttachGame={handleAttachGame}
          x={x} 
          y={y} 
        />
      ) : null}
    </div>
  );
};

export default Plot;
