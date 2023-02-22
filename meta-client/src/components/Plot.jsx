import React, { useState } from 'react';
import PopUpPlotDetails from './PlotDetails/PopUpPlotDetails';
import { ethers } from 'ethers';
import Web3 from 'web3';

// import Web3 from 'web3';



async function metamaskConnection() {
  try {
    if (window.ethereum) {
      const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = res[0];
      console.log('Address:', address);
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address);
      console.log('Wallet balance:', web3.utils.fromWei(balance, 'ether'));
      const count = await web3.eth.getTransactionCount(address);
      console.log('Transaction count:', count);
      const estimate = await web3.eth.estimateGas({ from: address, to: address, value: web3.utils.toWei('0.01', 'ether') });
      console.log('Gas estimation:', estimate.toString());
      const logs = await web3.eth.getPastLogs({ fromBlock: '0x0', address: address });
      console.log('Logs:', logs);
    } else {
      const messageEl = document.createElement('div');
      messageEl.textContent = 'Please install the Metamask extension.';
      messageEl.style.color = 'red';
      document.body.appendChild(messageEl);
    }
  } catch (error) {
    console.error('Error connecting to Metamask:', error);
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
