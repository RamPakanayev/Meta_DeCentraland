import React from 'react';
import Popup from 'reactjs-popup';
import './PopUpPlotDetails.css';

const PopUpPlotDetails = ({ id, owner, game, price, onClose, userType, x, y, onSetPrice, onTransferOwnership, onAttachGame }) => {
  return (
    <Popup open={true} onClose={onClose} className={`popup-content ${userType === 'guest' ? 'popup-content--guest' : ''}`}>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <h2 className="popup-title">Plot Details</h2>
      <hr />
      <br />
      <p className="popup-text">Plot's: {id}</p>
      <p className="popup-text">Owner: {owner || 'None'}</p>
      <p className="popup-text">Game: {game || 'None'}</p>
      <p className="popup-text">Price: {price}</p>
      <p className="popup-text">X: {x}</p>
      <p className="popup-text">Y: {y}</p>
      {userType==='guest' ? null : (
        <div className="popup-buttons">
          <button className="popup-buy-btn">Buy</button>
          <button className="popup-sell-btn">Sell</button>
          <button className="popup-price-btn btn" onClick={onSetPrice}>Set Price</button>
          <button className="popup-transfer-btn btn" onClick={onTransferOwnership}>Transfer Ownership</button>
          <button className="popup-game-btn btn" onClick={onAttachGame}>Attach Game</button>
        </div>
      )}
    </Popup>
  );
};


export default PopUpPlotDetails;
