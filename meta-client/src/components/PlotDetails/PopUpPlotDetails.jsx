import React, { useState } from 'react';
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
  onClose,
  onBuy,
  onSell,
  onSetPrice,
  onTransferOwnership,
  onAttachGame,
}) => {
  const [showAccess, setShowAccess] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const handleAccess = () => {
    setShowAccess(true);
  };

  const handleBack = () => {
    setShowAccess(false);
    setShowBack(false);
  };

  const handleSell = () => {
    setShowBack(true);
  };

  const handleSetPrice = () => {
    setShowBack(true);
  };

  const handleTransferOwnership = () => {
    setShowBack(true);
  };

  const handleAttachGame = () => {
    setShowBack(true);
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
    } else {
      return (
        <>
          <button className="popup-play-btn" onClick={onBuy}>Play</button>
          <button className="popup-buy-btn" onClick={onBuy}>Buy</button>
          <button className="popup-access-btn" onClick={handleAccess}>Access</button>
        </>
      );
    }
  };

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
            <th>Plot ID</th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>Owner</th>
            <td>{owner || 'None'}</td>
          </tr>
          <tr>
            <th>Game</th>
            <td>{game || 'None'}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{price}</td>
          </tr>
          <tr>
            <th>Coordinates</th>
            <td>({x}, {y})</td>
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

PopUpPlotDetails.propTypes = {
  id: PropTypes.number.isRequired,
  owner: PropTypes.string,
  game: PropTypes.string,
  price: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
  onSell: PropTypes.func.isRequired,
  onSetPrice: PropTypes.func.isRequired,
  onTransferOwnership: PropTypes.func.isRequired,
  onAttachGame: PropTypes.func.isRequired,
};

export default PopUpPlotDetails
