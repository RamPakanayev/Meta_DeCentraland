import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Grid from './components/Grid/Grid';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';

function App() {
  const [showGrid, setShowGrid] = useState(false);

  const handleHomeClick = () => {
    setShowGrid(false);
  };

  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} />
      {showGrid ? <Grid /> : <EntryPage />}
      <Footer />
    </div>
  );
}

export default App;
