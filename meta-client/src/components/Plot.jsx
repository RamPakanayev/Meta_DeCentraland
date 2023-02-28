import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';

const Plot = ({ id, type, owner, game, price, x, y, onBuy, onPlay, userType, backendData,setBackendData, marketPlace, web3 }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  const handlePurchase = () => {
    if (type !== 'park' && type !== 'road') {
      setPurchased(true);
      onBuy(id);
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
    width: '10px',
    height: '10px',
    margin: 0,
    padding: 0,
    cursor: type === 'regular' ? 'pointer' : 'default' // Disable the cursor for non-regular plots
  };

  const handlePlay = () => {
    if (game) {
      onPlay(game);
    }
  };

  return (
    <div className="plot" style={plotStyle} onClick={type === 'regular' ? handleClick : null}>
      {showDetails ? (
        <PopUpPlotDetails
          id={id}
          owner={owner}
          game={game}
          price={price}
          onClose={handleClose}
          onPurchase={handlePurchase}
          onPlay={handlePlay}
          x={x}
          y={y}
          userType={userType}
          backendData={backendData}
          setBackendData={setBackendData}
          marketPlace={marketPlace}
          web3={web3}
        />
      ) : null}
    </div>
  );
};

export default Plot;
