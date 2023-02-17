import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import Grid20 from './components/Grid copy/Grid20';

function App() {
  const [showGrid, setShowGrid] = useState(false);
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (type) => {
    setShowGrid(true);
    setUserType(type);
  };

  const handleHomeClick = () => {
    setShowGrid(false);
    setUserType('');
  };

  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} />
      {showGrid ? <Grid20 userType={userType} /> : <EntryPage onUserTypeChange={handleUserTypeChange} />}
      <Footer />
    </div>
  );
}

export default App;