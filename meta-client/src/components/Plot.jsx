import React, { useState,useEffect } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';

const Plot = ({ id, type, owner, game, price, x, y, onBuy, onPlay, userType, backendData, setBackendData, marketPlace, web3 }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [plotStyle, setPlotStyle] = useState(false);
  
  useEffect(() => {
    const plot = backendData.find(plot => plot.id === id);
    const isPurchased = plot.owner !== null && plot !== null;    
    setPurchased(isPurchased);
    setPlotStyle({
      ...plotStyle,
      
    });
  }, [backendData, id, type]);
  
  

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

  const handlePurchase = () => {
    if (type !== 'park' && type !== 'road') {
      setPurchased(true);
    }
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const handlePlay = () => {
    if (game) {
      onPlay(game);
    }
  };

  const style = {
    gridColumn: x,
    gridRow: y,
    backgroundColor:  backendData.find(plot => plot.id === id).onSale && purchased ?'fuchsia':(purchased && game ? 'blue' : (purchased ? 'red' : getColor(type))),
    width: '10px',
    height: '10px',
    margin: 0,
    padding: 0,
    cursor: type === 'regular' ? 'pointer' : 'default' // Disable the cursor for non-regular plots
  };
  

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="plot" style={style} onClick={type === 'regular' ? handleClick : null}>
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
          setPurchased={setPurchased}
        />
      ) : null}
    </div>
  );
};

export default Plot;
