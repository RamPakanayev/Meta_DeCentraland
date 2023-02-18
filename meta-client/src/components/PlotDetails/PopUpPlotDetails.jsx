import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import './PopUpPlotDetails.css';

const PopUpPlotDetails = ({
  id,
  owner,
  game,
  price,
  x,
  y,
  userType,
  onClose,
  onBuy,
  onSell,
  onSetPrice,
  onTransferOwnership,
  onAttachGame,
}) => {
  const isBuyer = userType === 'buyer';
  const isSeller = userType === 'seller';

  return (
    <Popup open={true} onClose={onClose} className={`popup-content ${isBuyer ? 'popup-content--buyer' : ''} ${isSeller ? 'popup-content--seller' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <h2 className="popup-title">Plot Details</h2>
      <hr />
      <br />
      <p className="popup-text">Plot ID: {id}</p>
      <p className="popup-text">Owner: {owner || 'None'}</p>
      <p className="popup-text">Game: {game || 'None'}</p>
      <p className="popup-text">Price: {price}</p>
      <p className="popup-text">Coordinates: ({x}, {y})</p>
      {isBuyer && (
        <div className="popup-buttons">
          <button className="popup-buy-btn" onClick={onBuy}>Buy</button>
        </div>
      )}
      {isSeller && (
        <div className="popup-buttons">
          <button className="popup-sell-btn" onClick={onSell}>Sell</button>
          <button className="popup-price-btn btn" onClick={onSetPrice}>Set Price</button>
          <button className="popup-transfer-btn btn" onClick={onTransferOwnership}>Transfer Ownership</button>
          <button className="popup-game-btn btn" onClick={onAttachGame}>Attach Game</button>
        </div>
      )}
    </Popup>
  );
};

PopUpPlotDetails.propTypes = {
  id: PropTypes.number.isRequired,
  owner: PropTypes.string,
  game: PropTypes.string,
  price: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  userType: PropTypes.oneOf(['guest', 'buyer', 'seller']).isRequired,
  onClose: PropTypes.func.isRequired,
  onBuy: PropTypes.func,
  onSell: PropTypes.func,
  onSetPrice: PropTypes.func,
  onTransferOwnership: PropTypes.func,
  onAttachGame: PropTypes.func,
};

PopUpPlotDetails.defaultProps = {
  owner: null,
  game: null,
  onBuy: null,
  onSell: null,
  onSetPrice: null,
  onTransferOwnership: null,
  onAttachGame: null,
};

export default PopUpPlotDetails;
