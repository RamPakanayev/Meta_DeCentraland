import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopUpPlotDetails.css';

const PopUpPlotDetails = ({ owner, game, price, onClose, x, y }) => {
  return (
    <Popup open={true} onClose={onClose} className="popup-content">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <h2 className="popup-title">Plot Details</h2>
      <hr />
      <br />
      <p className="popup-text">Owner: {owner || 'None'}</p>
      <p className="popup-text">Game: {game || 'None'}</p>
      <p className="popup-text">Price: {price}</p>
      <p className="popup-text">X: {x}</p>
      <p className="popup-text">Y: {y}</p>
      <div className="popup-buttons">
        <button className="popup-buy-btn">Buy</button>
        <button className="popup-sell-btn">Sell</button>
      </div>
    </Popup>
  );
};

export default PopUpPlotDetails;
