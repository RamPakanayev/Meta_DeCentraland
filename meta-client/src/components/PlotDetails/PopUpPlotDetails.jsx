import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import './PopUpPlotDetails.css';
import Web3 from 'web3'

const PopUpPlotDetails = ({
  id,
  onClose,
  onBuy,
  onSell,
  onSetPrice,
  onTransferOwnership,
  onAttachGame,
  forSale,
  backendData,
  setBackendData,
  userType,
  marketPlace,
  web3,
  setPurchased,
}) => {
  const [showAccess, setShowAccess] = useState(false);
  const [showBack, setShowBack] = useState(false);
  

//from now
  const marketPlaceContractAddress = "0xc189be134B7501b5f0dF448b9d0843A01f2A3EFc";
  const myMarketPlaceContract = new web3.eth.Contract(marketPlace.abi, marketPlaceContractAddress);
//


  const handleAccess = () => {
    setShowAccess(true);
    console.log('access');
  };

  const handleBack = () => {
    setShowAccess(false);
    setShowBack(false);
    console.log('back');
  };

  const handleSell = () => {
    setShowBack(true);
    console.log('sell');
  };

  const handleSetPrice = () => {
    setShowBack(true);
    console.log('set price');
  };

  const handleTransferOwnership = () => {
    setShowBack(true);
    console.log('transfer ownership');
  };

  const handleAttachGame = () => {
    setShowBack(true);
    console.log('attach game');
  };

  const handlePlay = async () => {
    console.log('play game');
  };

  const handleNftBuy = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
  
    const tokenId = id;
    const ownerPlot = backendData.find(plot => plot.id === tokenId);
    const flatNftContractAdress = "0x7BcEB50c0659D673b888FebFc72Eea0ABEabd42B";
    if (!ownerPlot) {
      console.log(`No plot found with ID ${tokenId}`);
      return;
    }
  
    console.log(ownerPlot);
  
    const price = ownerPlot.price;
    console.log(price);
  
    const options = {
      from: account,
      value: price + web3.utils.toWei('0.1', 'ether'), // Add the price to the listing fee
      gasPrice: web3.utils.toWei('30', 'gwei').toString(),
    };
  
    try {
      const transaction = await myMarketPlaceContract.methods.buyNft(flatNftContractAdress, tokenId, price).send(options);
      console.log('Transaction:', transaction);
  
      const updatedBackendData = [...backendData];
      const index = updatedBackendData.findIndex(plot => plot.id === id);
      if (ownerPlot) {
        updatedBackendData[index].owner = account;
        updatedBackendData[index].forSale = false;
      }
      setBackendData(updatedBackendData);
  
      console.log('NFT purchased successfully!');
      setPurchased(true);
    } catch (error) {
      console.log('Error purchasing NFT:', error);
    }
  };
  

  
  const renderButtons = () => {
    if (showAccess) {
      return (
        <>
          <button className="popup-sell-btn" onClick={handleSell}>Sell</button>
          <button className="popup-price-btn btn" onClick={handleSetPrice}>Set Price</button>
          <button className="popup-transfer-btn btn" onClick={handleTransferOwnership}>Transfer Ownership</button>
          <button className="popup-game-btn btn" onClick={handleAttachGame}>Attach Game</button>
          <button className="popup-back-btn" onClick={handleBack}>Back</button>
        </>
      );
    } else if(userType === 'buyer/seller'){
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
          <button className="popup-buy-btn" onClick={handleNftBuy}>Buy</button>
          <button className="popup-access-btn" onClick={handleAccess}>Access</button>
        </>
      )
    }
    else {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
        </>
      );
    }
  };
  
  

  const ownerPlot = backendData.find(plot => plot.id === id);
  const onSale = backendData[id - 1].onSale
  const tokenId = backendData[id - 1].tokenId

  
  return (
    <>
    <div className="overlay" />
    <Popup open={true} onClose={onClose} className="popup-content">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2 className="popup-title">Plot Details</h2>
      <hr />
      <br />
      <table className="popup-table">
        <tbody>
          <tr>
            <th>Plot ID*</th>
            <td>{ownerPlot.id}</td>

          </tr>
          <tr>
          <th>Token ID*</th>
          <td>{tokenId}</td>
          </tr>
          <tr>
            <th>Owner*</th>
          
            <td>{ownerPlot && ownerPlot.owner ? ownerPlot.owner : 'Null'}</td>

            {/* <td>{owner || 'None'}</td> */}
          </tr>
          <tr>
            <th>Game*</th>
            <td>{ownerPlot && ownerPlot.game ? ownerPlot.game : 'Null'}</td>
          </tr>
          <tr>
            <th>Price*</th>
            <td>{ownerPlot.price}</td>
          </tr>
          <tr>
            <th>Coordinates*</th>
            <td>({ownerPlot.x}, {ownerPlot.y})</td>
          </tr>
          <tr>
          <th>For Sale*</th>
          <td className={onSale ? 'green-text' : 'red-text'}>{onSale ? 'Yes' : 'No'}</td>
          </tr>
         
        </tbody>
      </table>
      <div className="popup-buttons">
        {renderButtons()}
      </div>
    </Popup>
    </>
  );
};


export default PopUpPlotDetails
