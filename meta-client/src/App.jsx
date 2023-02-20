import React, { useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import Grid20 from './components/Grid copy/Grid20';
import Grid from './components/Grid/Grid'
import generatePlots from './components/Grid/plotsData';


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

  
  // get the plot data
  const plots = generatePlots();

  // create the artifact JSON file
  const jsonFile = new Blob([JSON.stringify(plots, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonFile);


  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} />
      <Grid20/>
      <a href={url} download="Meta_DeCentraland_Plots.json">Download JSON</a>
      <Footer />
    </div>
  );
}

export default App;