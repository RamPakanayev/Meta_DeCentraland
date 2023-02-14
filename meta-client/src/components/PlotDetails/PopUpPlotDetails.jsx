import React from 'react';
import Modal from 'react-modal';
import './PopUpPlotDetails.css';

Modal.setAppElement('#root'); // Set the app element for react-modal
const PopUpPlotDetails = ({ owner, game, price, onClose, x, y }) => {
  return (
    <Modal isOpen={true} onRequestClose={onClose} shouldCloseOnOverlayClick={true}>
      <button onClick={onClose} style={{ float: 'right' }}>
        X
      </button>
      <h2>Plot Details</h2>
      <hr />
      <br />
      <p>Owner: {owner || "None"}</p>
      <p>Game: {game || 'None'}</p>
      <p>Price: {price}</p>
      <p>X: {x}</p>
      <p>Y: {y}</p>
    </Modal>
  );
};

export default PopUpPlotDetails;
