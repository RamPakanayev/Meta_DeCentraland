import React from 'react';
import Modal from 'react-modal';
import './PopUpPlotDetails.css';

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#292b2d',
    color: '#f0f0f0',
    borderRadius: '5px',
    padding: '20px',
    fontSize: '16px',
    lineHeight: '1.9',
    maxWidth: '900px',
    margin: 'auto',
  },
  h2: {
    fontSize: '44px',
    marginTop: '0',
    marginBottom: '0',
    textAlign: 'center',
  },
  hr: {
    borderTop: '1px solid #f0f0f0',
    marginTop: '10px',
    marginBottom: '10px',
  },
  p: {
    fontSize: '24px',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '3%',
    textAlign:'left',
  },
  
};


Modal.setAppElement('#root'); // Set the app element for react-modal

const PopUpPlotDetails = ({ owner, game, price, onClose, x, y }) => {
  return (
    <Modal isOpen={true} onRequestClose={onClose} style={modalStyles}>
      <button onClick={onClose} style={modalStyles.button}>
        X
      </button>
      <h2 style={modalStyles.h2}>Plot Details</h2>
      <hr style={modalStyles.hr} />
      <br />
      <p style={modalStyles.p}>Owner: {owner || 'None'}</p>
      <p style={modalStyles.p}>Game: {game || 'None'}</p>
      <p style={modalStyles.p}>Price: {price}</p>
      <p style={modalStyles.p}>X: {x}</p>
      <p style={modalStyles.p}>Y: {y}</p>
    </Modal>
  );
};

export default PopUpPlotDetails;
