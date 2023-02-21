import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';
import { ethers } from 'ethers';
function metamaskConnection() {
  if (window.ethereum) {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((res) => {
        const address = res[0];
        console.log('Address:', address);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider
          .getBalance(address)
          .then((balance) => {
            console.log('Wallet balance:', ethers.utils.formatEther(balance));
          })
          .catch((error) => {
            console.error('Error retrieving wallet balance:', error);
          });
        provider
          .getTransactionCount(address)
          .then((count) => {
            console.log('Transaction count:', count);
          })
          .catch((error) => {
            console.error('Error retrieving transaction count:', error);
          });
        provider
          .estimateGas({ from: address, to: address, value: ethers.utils.parseEther('0.01') })
          .then((estimate) => {
            console.log('Gas estimation:', estimate.toString());
          })
          .catch((error) => {
            console.error('Error estimating gas:', error);
          });
        provider
          .getLogs({ address: address })
          .then((logs) => {
            console.log('Logs:', logs);
          })
          .catch((error) => {
            console.error('Error retrieving logs:', error);
          });
      })
      .catch((error) => {
        console.error('Error connecting to Metamask:', error);
      });
  } else {
    alert('Please install the Metamask extension.');
  }
}

const Plot = ({ id, type, owner, game, price, x, y, onBuy, onPlay, userType, backendData }) => {
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
        />
      ) : null}
    </div>
  );
};


export default Plot;
