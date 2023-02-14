import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element for react-modal

const PopUpPlotDetails = ({ owner, game, price, onClose }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid gray',
      borderRadius: '5px',

    },
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
      <button onClick={onClose} style={{float: 'right'}}>X</button>
      <h2>Plot Details</h2>
      <p>Owner: {owner}</p>
      <p>Game: {game || 'None'}</p>
      <p>Price: {price}</p>
    </Modal>
  );
};

export default PopUpPlotDetails;
