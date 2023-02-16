import React, { useState } from 'react';
import './EnteryPage.css';
import Grid from '../Grid/Grid';

const EntryPage = () => {
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div className="entry-page">
      {userType ? (
        <Grid userType={userType} />
      ) : (
        <>
          <h2 className="entry-page__title">Are you a guest or a buyer/seller?</h2>
          <div className="entry-page__buttons">
            <button
              className={`entry-page__button ${
                userType === 'guest' ? 'entry-page__button--selected' : ''
              }`}
              onClick={() => handleUserTypeChange('guest')}
            >
              Guest
            </button>
            <button
              className={`entry-page__button ${
                userType === 'buyer-seller' ? 'entry-page__button--selected' : ''
              }`}
              onClick={() => handleUserTypeChange('buyer-seller')}
            >
              Buyer/Seller
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EntryPage;
