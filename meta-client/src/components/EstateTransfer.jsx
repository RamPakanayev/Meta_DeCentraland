import React, { useState } from 'react';

const EstateTransfer = ({ plots, onClose }) => {
  const [plotId, setPlotId] = useState('');
  const [newOwner, setNewOwner] = useState('');

  const handlePlotIdChange = (event) => {
    setPlotId(event.target.value);
  };

  const handleNewOwnerChange = (event) => {
    setNewOwner(event.target.value);
  };

  const handleTransfer = () => {
    // code to transfer ownership of plot with ID plotId to new owner newOwner
  };

  return (
    <div className="estate-transfer">
      <h2>Transfer Estate Ownership</h2>
      <label>
        Plot ID:
        <input type="text" value={plotId} onChange={handlePlotIdChange} />
      </label>
      <label>
        New Owner:
        <input type="text" value={newOwner} onChange={handleNewOwnerChange} />
      </label>
      <button onClick={handleTransfer}>Transfer</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EstateTransfer;
