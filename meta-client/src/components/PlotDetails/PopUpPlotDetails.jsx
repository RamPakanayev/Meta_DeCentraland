import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import './PopUpPlotDetails.css';
import Web3 from 'web3'

const PopUpPlotDetails = ({
  id,
  onClose,
  onBuy,
  onSell,
  onSetPrice,
  onTransferOwnership,
  onAttachGame,
  forSale,
  backendData,
}) => {
  const [showAccess, setShowAccess] = useState(false);
  const [showBack, setShowBack] = useState(false);
  // const [showContract, setShowContract] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response1 = await fetch('/api/Marketplace');
  //       if (!response1.ok) {
  //         throw new Error(response1.statusText);
  //       }
  //       const json = await response1.json();
  //       setShowContract(json.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/PixelZ');
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       const json = await response.json();
  //       setShowContract(json.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/Migrations');
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       const json = await response.json();
  //       setShowContract(json.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/FlatNFT');
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       const json = await response.json();
  //       setShowContract(json.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/ConvertLib');
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       const json = await response.json();
  //       setShowContract(json.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);
///////////////////////////////after will be in utils///////////////////////////////////////////////
  const handleAccess = () => {
    setShowAccess(true);
    console.log('accsess');
  };

  const handleBack = () => {
    setShowAccess(false);
    setShowBack(false);
    console.log('back');
  };

  const handleSell = () => {
    setShowBack(true);
    console.log('sell');
  };

  const handleSetPrice = () => {
    setShowBack(true);
    console.log('set price');
  };

  const handleTransferOwnership = () => {
    setShowBack(true);
    console.log('Transfer Ownership');
  };

  const handleAttachGame = () => {
    setShowBack(true);
    console.log('Attach Game');
  };
  
  const handleNftBuy = async () => {
    console.log('Buy NFT');
    // if(!showContract){
    //   console.log('ABI is missing');
    //   return;
    // }
    // const web3 = new Web3(Web3.givenProvider);
    // const marketplaceContractAddress = showContract;
    // const marketplaceContract = new web3.eth.Contract(showContract.abi, marketplaceContractAddress);
    // const selectedPlot = backendData.find((plot) => plot.id === id);
    // const { nftContract, tokenId, price } = selectedPlot;

    // // Estimate the gas cost for the transaction
    // const gasPrice = await web3.eth.getGasPrice();
    // const gasLimit = 300000;
    // const estimatedGas = await marketplaceContract.methods.buyNft(nftContract, tokenId).estimateGas({
    //   from: web3.eth.defaultAccount,
    //   value: price,
    //   gasPrice,
    //   gasLimit,
    // });

    // // Prompt the user to confirm the transaction
    // const confirmed = window.confirm(`Are you sure you want to buy this NFT for ${price} ether?`);
    // if (confirmed) {
    //   try {
    //     // Send the transaction to the network
    //     const receipt = await marketplaceContract.methods.buyNft(nftContract, tokenId).send({
    //       from: web3.eth.defaultAccount,
    //       value: price,
    //       gas: estimatedGas,
    //       gasPrice,
    //     });

    //     // Update the owner of the plot in the backend data
    //     const updatedBackendData = backendData.map((plot) => {
    //       if (plot.id === id) {
    //         return {
    //           ...plot,
    //           owner: web3.eth.defaultAccount,
    //           forSale: false,
    //         };
    //       } else {
    //         return plot;
    //       }
    //     });

    //     // Update the state of the app
    //     onBuy(id, updatedBackendData);
    //     alert('Successfully purchased NFT');
    //   } catch (error) {
    //     console.error(error);
    //     alert('Failed to purchase NFT');
    //   }
    // }
      
  };

  const handlePlay = async () => {
    console.log('Play Game');
  };
///////////////////////////////after will be in utils///////////////////////////////////////////////



  const renderButtons = () => {
    if (showAccess) {
      return (
        <>
          <button className="popup-sell-btn" onClick={handleSell}>Sell</button>
          <button className="popup-price-btn btn" onClick={handleSetPrice}>Set Price</button>
          <button className="popup-transfer-btn btn" onClick={handleTransferOwnership}>Transfer Ownership</button>
          <button className="popup-game-btn btn" onClick={handleAttachGame}>Attach Game</button>
          <button className="popup-back-btn" onClick={handleBack}>Back</button>
        </>
      );
    } else {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
          <button className="popup-buy-btn" onClick={handleNftBuy}>Buy</button>
          <button className="popup-access-btn" onClick={handleAccess}>Access</button>
        </>
      );
    }
  };
  const ownerPlot = backendData.find(plot => plot.id === id);
  
  return (
    <>
    <div className="overlay" />
    <Popup open={true} onClose={onClose} className="popup-content">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2 className="popup-title">Plot Details</h2>
      <hr />
      <br />
      <table className="popup-table">
        <tbody>
          <tr>
            <th>Plot ID*</th>
            <td>{ownerPlot.id}</td>

          </tr>
          <tr>
            <th>Owner*</th>
          
            <td>{ownerPlot && ownerPlot.owner ? ownerPlot.owner : 'Null'}</td>

            {/* <td>{owner || 'None'}</td> */}
          </tr>
          <tr>
            <th>Game*</th>
            <td>{ownerPlot && ownerPlot.game ? ownerPlot.game : 'Null'}</td>
          </tr>
          <tr>
            <th>Price*</th>
            <td>{ownerPlot.price}</td>
          </tr>
          <tr>
            <th>Coordinates*</th>
            <td>({ownerPlot.x}, {ownerPlot.y})</td>
          </tr>
          <tr>
            <th>For Sale*</th>
            <td className={ownerPlot.forSale ? 'green-text' : 'red-text'}>
              {ownerPlot.forSale ? 'Yes' : 'No'}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="popup-buttons">
        {renderButtons()}
      </div>
    </Popup>
    </>
  );
};


export default PopUpPlotDetails
