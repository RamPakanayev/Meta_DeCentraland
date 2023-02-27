import React, { useEffect ,useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import Grid20 from './components/Grid copy/Grid20';
import Grid from './components/Grid/Grid'
import generatePlots from './components/Grid/plotsData';
import Map from './components/Map/Map';
import Web3 from 'web3';

function App() {
  const [showGrid, setShowGrid] = useState(false);
  const [userType, setUserType] = useState('');
  const [backendData, setBackendData]= useState([]);
  const [marketPlace, setMarketPlace] = useState(false);
  const [flatNFT, setFlatNFT] = useState(null);
  const [showEntryPage, setShowEntryPage] = useState(true);
  const [plots, setPlots] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await fetch('/api/Marketplace');
        if (!response1.ok) {
          throw new Error(response1.statusText);
        }
        const json = await response1.json();
        setMarketPlace(json.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const fetchFlatNFT = async () => {
    try {
      const response = await fetch('/api/flatNFT');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setFlatNFT(json);
      generatePlotsData(json, web3); // pass web3 as a parameter
    } catch (error) {
      console.log(error);
    }
  };

  const generatePlotsData = async (flatNFT) => {
    try {
      const data = await generatePlots(flatNFT);
      setPlots(data.plots);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setBackendData(json.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else {
      console.log('Please install the Metamask extension.');
    }
  }, []);

  const handleUserTypeChange = (type) => {
    setShowGrid(true);
    setShowEntryPage(false);
    setUserType(type);
  };

  const handleHomeClick = () => {
    setShowGrid(false);
    setShowEntryPage(true);
    setUserType('');
  };

  const jsonFile = new Blob([JSON.stringify(plots, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonFile);

  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} web3={web3} />
      {showEntryPage ? (
        <EntryPage setUserType={handleUserTypeChange} />
      ) : (
        <Map backendData={backendData} userType={userType} web3={web3} />
      )}
      <a href={url} download="Meta_DeCentraland_Plots.json">Download JSON</a>
      <Footer />
    </div>
  );
}

export default App;