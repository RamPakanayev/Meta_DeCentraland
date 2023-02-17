import React from 'react';
import './EnteryPage.css'

const EntryPage = ({ onUserTypeChange }) => {
  return (
    <div className="entry-page">
      {/* render the prompt and the buttons */}
      <h2 className="entry-page__title">Are you a guest or a buyer/seller?</h2>
      <div className="entry-page__buttons">
        <button className="entry-page__button" onClick={() => onUserTypeChange('guest')}>
          Guest
        </button>
        <button className="entry-page__button" onClick={() => onUserTypeChange('buyer-seller')}>
          Buyer/Seller
        </button>
      </div>
    </div>
  );
};

export default EntryPage;