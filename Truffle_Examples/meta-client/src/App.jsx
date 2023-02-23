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
      {/* render the header with a callback to handle the home button click */}
      <Header onHomeClick={handleHomeClick} />
      {/* render the entry page or the grid based on the showGrid state */}
      {/* {showGrid ? <Grid20 userType={userType} /> : <EntryPage onUserTypeChange={handleUserTypeChange} />} */}
      {/* render the footer */}
      <Grid20/>
      <Footer />
    </div>
  );
}

export default App;