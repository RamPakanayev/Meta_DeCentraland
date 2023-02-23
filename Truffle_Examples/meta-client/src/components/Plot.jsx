import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';
import { ethers } from 'ethers';

function metamaskConnection() {
  if (window.ethereum) {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((res) => {
        // Return the address of the wallet
        const address = res[0];//[0] for getting the balance inside the address
        console.log('1) ' + res);
        // console.log('2) ' +address);

        // Retrieve the balance of the wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider
          .getBalance(address)
          .then((balance) => {
            console.log('3) Wallet balance:', ethers.utils.formatEther(balance));
          })
          .catch((error) => {
            console.error('Error retrieving wallet balance:', error);
          });
      })
      .catch((error) => {
        console.error('Error connecting to Metamask:', error);
      });
  } else {
    alert('Please install the Metamask extension.');
  }
}

const Plot = ({ id, type, owner, game, price, x, y, onBuy, onPlay, userType }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);

    // Call Metamask function to connect
    metamaskConnection();
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
    width: '7px',
    height: '7px',
    margin: 0,
    padding: 0,
  };

  const handlePlay = () => {
    if (game) {
      onPlay(game);
    }
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
          onPurchase={handlePurchase}
          onPlay={handlePlay}
          x={x}
          y={y}
          userType={userType}
        />
      ) : null}
    </div>
  );
};

export default Plot;
