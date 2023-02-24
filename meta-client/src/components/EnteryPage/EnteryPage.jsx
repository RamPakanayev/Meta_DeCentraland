import React from 'react';
import './EnteryPage.css'

const EntryPage = ({ setUserType }) => {
  return (
    <div className="entry-page">
      {/* render the prompt and the buttons */}
      <h2 className="entry-page__title">Are you a guest or a buyer/seller?</h2>
      <div className="entry-page__buttons">
        <button className="guest-button" onClick={() => setUserType('guest')}>
          Guest
        </button>
        <button className="buyer-seller-button" onClick={() => setUserType('buyer/seller')}>
          Buyer/Seller
        </button>
      </div>
    </div>
  );
};

export default EntryPage;