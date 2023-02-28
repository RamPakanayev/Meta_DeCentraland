import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import Grid20 from './components/Grid copy/Grid20';
import Grid from './components/Grid/Grid';
import generatePlots from './components/Grid/plotsData';
import Map from './components/Map/Map';
import Web3 from 'web3';
import Loading from 'react-loading-components';

function App() {
  const [showGrid, setShowGrid] = useState(false);
  const [userType, setUserType] = useState('');
  const [backendData, setBackendData] = useState([]);
  const [marketPlace, setMarketPlace] = useState(false);
  const [flatNFT, setFlatNFT] = useState(null);
  const [showEntryPage, setShowEntryPage] = useState(true);
  const [plots, setPlots] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [isWeb3Connected, setIsWeb3Connected] = useState(false);

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
      if (isWeb3Connected) {
        generatePlotsData(json, web3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePlotsData = async (flatNFT, web3) => {
    try {
      const plots = await generatePlots(flatNFT, web3);
      // loop through the plots array and update the nftId for regular plots
      plots.forEach((plot) => {
        if (plot.type === 'regular') {
          plot.nftId = `NFT-${plot.id}`;
        }
      });
      setPlots(plots);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
      window.ethereum.enable().then(() => {
        setIsWeb3Connected(true);
        fetchFlatNFT();
      }).catch(console.log);
    } else {
      console.log('Please install the Metamask extension.');
    }
  }, []);

  useEffect(() => {
    fetchFlatNFT();
  }, [isWeb3Connected]);

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
  console.log('isWeb3Connected: ' + isWeb3Connected);
  console.log('plots: ' + plots);

  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} web3={web3} />
      {showEntryPage ? (
        <EntryPage setUserType={handleUserTypeChange} />
      ) : (
        <Map backendData={backendData} userType={userType} web3={web3} />
      )}
      {isWeb3Connected && plots ? (
        <a href={url} download="Meta_DeCentraland_Plots.json">
          Download JSON
        </a>
      ) : (
        <Loading type="spinning_circles" width={50} height={100} fill="#040123" />
      )}
      <Footer />
    </div>
  );
  
  
}

export default App;