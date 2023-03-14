import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './PopUpPlotDetails.css';

const PopUpPlotDetails = ({
  id,
  onClose,
  backendData,
  setBackendData,
  userType,
  marketPlace,
  web3,
  setPurchased,
}) => {
  // State variables to handle different popup states
  const [showAccess, setShowAccess] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [myAddress, setMyAddress] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [attachGameClicked, setAttachGameClicked] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [SellClicked, setSellClicked] = useState(false);

  // Contract address for the marketplace contract
  const marketPlaceContractAddress = "0x0151Ee79bbf88eFB0D26e8E4b0dFbf7Cda729ADB";
  // Create an instance of the marketplace contract using web3 and the contract ABI
  const myMarketPlaceContract = new web3.eth.Contract(marketPlace.abi, marketPlaceContractAddress);

  // Use the useEffect hook to connect to the user's MetaMask account
  useEffect(() => {
    const toggleConnection = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setMyAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error connecting to Metamask:', error);
      }
    };
    toggleConnection();
  }, [setMyAddress]);
  
  // Function to handle buying an NFT plot
  const handleNftBuy = async () => {
    // Get the user's MetaMask account
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
  
    const tokenId = id;
    const ownerPlot = backendData.find((plot) => plot.id === tokenId);
    // Contract address of the NFT contract for the plots
    const flatNftContractAddress = "0xF5ea76aeB9DA5AA0d1c021C775D99B2272e63119";
    if (!ownerPlot) {
      console.log(`No plot found with ID ${tokenId}`);
      return;
    }
  
    // Get the price of the plot
    const price = ownerPlot.price;
    // Calculate the value to send with the transaction
    const options = {
      from: account,
      value: price + web3.utils.toWei('0.1', 'ether'), // Add the price to the listing fee
      gasPrice: web3.utils.toWei('30', 'gwei').toString(),
    };
  
    try {
      // Call the buyNft method in the marketplace contract
      const transaction = await myMarketPlaceContract.methods
        .buyNft(flatNftContractAddress, tokenId)
        .send(options);
      console.log('Transaction:', transaction);
  
      // Update the backend data to reflect the new owner and remove the onSale flag
      const updatedBackendData = [...backendData];
      const index = updatedBackendData.findIndex((plot) => plot.id === id);
      if (ownerPlot) {
        updatedBackendData[index].owner = account;
        updatedBackendData[index].onSale = false; // Update onSale to false once the plot is purchased
      }
       
      setBackendData(updatedBackendData);
  
      console.log('NFT purchased successfully!');
      setPurchased(true);
    } catch (error) {
      console.log('Error purchasing NFT:', error);
    }
  };
  
  // Function to handle attaching game URL to the NFT
  const handleAttachOk = (url) => {  
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
    if (url && !urlRegex.test(url)) {
      window.alert("Please enter a valid URL!");
      return;
    }
  
    const updatedBackendData = [...backendData];
    const index = updatedBackendData.findIndex((plot) => plot.id === id);
    if (index !== -1) {
      updatedBackendData[index].game = url;
      setBackendData(updatedBackendData);
    }
    setGameUrl('');
    setAttachGameClicked(false);
  };
  
  
 // This function is called when the user clicks the "Set Price" button in the popup
// It validates the input price and calls the resellNft method in the smart contract to set the price of the NFT
// It then updates the backend data with the new price and updates the state variables
  const handleSetPriceOk = async (newPrice) => {
    // Check if newPrice is a valid integer string
    if (!/^\d+$/.test(newPrice)) {
      window.alert("The price must be an integer!");
      return;
    }
  
    // Convert newPrice to a number
    newPrice = parseInt(newPrice, 10);
  
    // Check if newPrice is greater than 0
    if (newPrice <= 0) {
      window.alert("The price must be greater than 0!");
      return;
    }
  
    try {
      const accounts = await web3.eth.getAccounts();
      const myMarketPlaceContract = new web3.eth.Contract(marketPlace.abi, marketPlaceContractAddress);
      const flatNftContractAddress = "0x7BcEB50c0659D673b888FebFc72Eea0ABEabd42B";
      // Call the resellNft method in the smart contract
      await myMarketPlaceContract.methods.resellNft(id, web3.utils.toWei(newPrice.toString(), "ether")).send({
        from: accounts[0],
        gasPrice: web3.utils.toWei('30', 'gwei').toString(),
      }, (error, transactionHash) => {
        if (error) {
          console.log('Error setting price:', error);
        } else {
          console.log('Transaction submitted:', transactionHash);
        }
      });
  
      // Update the backend data with the new price
      const updatedBackendData = [...backendData];
      const index = updatedBackendData.findIndex((plot) => plot.id === id);
      if (index !== -1) {
        updatedBackendData[index].price = newPrice;
        updatedBackendData[index].onSale = true;
        setBackendData(updatedBackendData);
      }
  
      // Reset state variables
      setNewPrice();
      setSellClicked(false);
  
      console.log('Price set successfully:', newPrice);
    } catch (error) {
      // Handle errors
      if (error.message.includes("User denied transaction")) {
        console.log("User denied transaction");
      } else {
        console.log('Error setting price:', error);
      }
    }
  };

  // This function is called when the user clicks the "Sell" button in the popup
  // It sets the sellClicked state variable to true and shows the "Set Price" and "Attach Game" 
  const handleSell = () => {
    setShowBack(true);
    setSellClicked(true);
    console.log('sell');
  };

  // This function is called when the user clicks the "Attach Game" button in the popup
  // It sets the attachGameClicked state variable to true and shows the "OK" button and input 
  const handleAttachGame = () => {
    setShowBack(true);
    setAttachGameClicked(true);
    console.log('attach game');
  };

  // This function is called when the user clicks the "Play" button in the popup
  // It checks if there is a game URL associated with the plot and opens it in a new window if there is
  const handlePlay = async () => {
    console.log('play game');
    if (backendData[id - 1].game) {
      window.open(backendData[id - 1].game, '_blank');
    } else {
      window.alert('No game URL found for this plot, So there are nothing to play here    :-(   ');
    }
  };

  // This function is responsible for handling the "Access" button click event and setting the "setShowAccess" state to true,
  // which will display the "Sell" and "Attach Game" buttons.
  const handleAccess = () => {
    setShowAccess(true);
    console.log('access');
  };

  // This function is responsible for handling the "Back" button click event and resetting the state variables.
  const handleBack = () => {
    setShowAccess(false);
    setShowBack(false);
    setAttachGameClicked(false);
    setSellClicked(false);

    console.log('back');
  };


  // This function is responsible for rendering the buttons in the popup based on different conditions such as user type, plot owner, and plot status.
  const renderButtons = () => {
    // If the showAccess state is true
    if (showAccess) {
      // Render the sell, attach game, and back buttons
      return (
        <>
          <button className="popup-sell-btn" onClick={handleSell}>Sell</button>
          {SellClicked && (
          <div className="sell-div">
            <input className="set-price-input" type="number" placeholder="Set a price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            <button onClick={() => handleSetPriceOk(newPrice)}>OK</button>
          </div>
        )}
          <button className="popup-game-btn btn" onClick={handleAttachGame}>Attach Game</button>
        {attachGameClicked && (
          <div className="attach-game-div">
            <input className="game-input" type="text" placeholder="Enter game URL" value={gameUrl} onChange={(e) => setGameUrl(e.target.value)} />
            <button onClick={() => handleAttachOk(gameUrl)}>OK</button>
          </div>
        )}
          <button className="popup-back-btn" onClick={handleBack}>Back</button>
        </>
      );
    }
    // If the user is a buyer/seller and the plot is on sale and is not owned by the current user 
    else if(userType === 'buyer/seller' && backendData[id - 1].onSale && backendData[id - 1]?.owner?.toLowerCase() !== myAddress?.toLowerCase()) {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
          <button className="popup-buy-btn" onClick={handleNftBuy}>Buy</button>
         
        </>
      )
    }
    // If the user is a buyer/seller and the plot is owned by the current user
    else if(userType === 'buyer/seller' && backendData[id - 1]?.owner?.toLowerCase() == myAddress?.toLowerCase())  {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
          <button className="popup-access-btn" onClick={handleAccess}>Access</button>
        </>
      )
    } 
    // Otherwise, render the play button
    else {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
        </>
      );
    }
  };

  // Find the plot with the given ID in the backend data
  const ownerPlot = backendData.find(plot => plot.id === id);
  // Get the onSale and tokenId values of the plot
  const onSale = backendData[id - 1].onSale
  const tokenId = backendData[id - 1].tokenId

  // Render the popup component
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
            <th>Plot ID</th>
            <td>{ownerPlot.id}</td>

          </tr>
          <tr>
          <th>Token ID</th>
          <td>{tokenId}</td>
          </tr>
          <tr>
            <th>Owner</th>
          
            <td>{ownerPlot && ownerPlot.owner ? ownerPlot.owner : 'Null'}</td>

            {/* <td>{owner || 'None'}</td> */}
          </tr>
          <tr>
            <th>Game</th>
            <td>{ownerPlot && ownerPlot.game ? ownerPlot.game : 'Null'}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{ownerPlot.price}</td>
          </tr>
          <tr>
            <th>(x,y)</th>
            <td>({ownerPlot.x}, {ownerPlot.y})</td>
          </tr>
          <tr>
          <th>For Sale</th>
          <td className={onSale ? 'green-text' : 'red-text'}>{onSale ? 'Yes' : 'No'}</td>
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