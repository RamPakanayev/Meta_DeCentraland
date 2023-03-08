import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import EntryPage from './components/EnteryPage/EnteryPage';
import MapAndNFTGenerator from './components/Map Creation/MapAndNFTGenerator';
import Map from './components/Map/Map';
import Web3 from 'web3';
import Loading from 'react-loading-components';
import './App.css'


function App() {
  // State hooks
  const [showGrid, setShowGrid] = useState(false);
  const [userType, setUserType] = useState('');
  const [backendData, setBackendData] = useState([]);
  const [marketPlace, setMarketPlace] = useState(null);
  const [flatNFT, setFlatNFT] = useState(null);
  const [showEntryPage, setShowEntryPage] = useState(true);
  const [plots, setPlots] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [isWeb3Connected, setIsWeb3Connected] = useState(false);

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
  }, []);//when adding function and states for button you may mention states inside the [] in the line

  // Fetch marketplace data from the server on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response1 = await fetch('/api/Marketplace');
        if (!response1.ok) {
          throw new Error(response1.statusText);
        }
        const json = await response1.json();
        setMarketPlace(json);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    // console.log(marketPlace);
  }, [marketPlace]);
  
  // Add this callback function to setMarketPlace
  const handleMarketPlaceChange = (newValue) => {
    console.log(newValue);
    setMarketPlace(newValue);
  };
  
 // Fetch flat NFT data from the server when Web3 is connected
  const fetchFlatNFT = async () => {
    try {
      const response = await fetch('/api/flatNFT');
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();

      // for the generation of the json plots !
      setFlatNFT(json);
      if (isWeb3Connected) {
          console.log("hi");
          // generatePlotsData(json, web3);
      }
    } catch (error) {
      console.log(error);
    }
  };

    // Generate data for the plots based on the flat NFT data and Web3
  const generatePlotsData = async (flatNFT, web3) => {
    try {
      const plots = await MapAndNFTGenerator(flatNFT, web3);
      // loop through the plots array and update the nftId for regular plots
      plots.forEach((plot) => {
        if (plot.type === 'regular') {
          plot.tokenId = `NFT-${plot.id}`;
        }
      });
      setPlots(plots);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  // Connect to Web3 when the component mounts
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

  // Fetch flat NFT data when Web3 is connected or disconnected
  useEffect(() => {
    fetchFlatNFT();
  }, [isWeb3Connected]);

  // Handler for when the user selects their user type
  const handleUserTypeChange = (type) => {
    setShowGrid(true);
    setShowEntryPage(false);
    setUserType(type);
  };

 // Handler for when the home button is clicked
  const handleHomeClick = () => {
    setShowGrid(false);
    setShowEntryPage(true);
    setUserType('');
  };

  // Create a JSON file of the plots data and generate a download link
  const jsonFile = new Blob([JSON.stringify(plots, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonFile);
 

  // Render the component
  return (
    <div className="App">
      <Header onHomeClick={handleHomeClick} web3={web3} />
      {showEntryPage ? (
        <EntryPage setUserType={handleUserTypeChange} />
      ) : (
      
        <Map backendData={backendData} userType={userType} web3={web3} marketPlace={marketPlace} setBackendData={setBackendData} />
        
      )}
       <Footer />
      {isWeb3Connected && plots.length ? (
        <a href={url} download="Meta_DeCentraland_Plots.json">
          Download JSON
        </a>
      ) : (
        <>
        <p>loading json metadata map file</p>
        <br/><br/>

        <Loading type="spinning_circles" width={50} height={100} fill="#040123" />
        </>
      )}
     
    </div>
  );
  
  
}

export default App;