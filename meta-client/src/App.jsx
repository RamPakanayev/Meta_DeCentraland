import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import Grid20 from './components/Grid copy/Grid20';
import Grid from './components/Grid/Grid'


function App() {
  // state variables to manage the visibility of the grid and the user type
  const [showGrid, setShowGrid] = useState(false);
  const [userType, setUserType] = useState('');

  // event handler to update the user type when the user selects a type
  const handleUserTypeChange = (type) => {
    setShowGrid(true);
    setUserType(type);
  };

  // event handler to go back to the entry page and reset the user type
  const handleHomeClick = () => {
    setShowGrid(false);
    setUserType('');
  };

  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} />
      <Grid20/>
      <Footer />
    </div>
  );
}

export default App;