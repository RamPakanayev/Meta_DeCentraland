import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import './PopUpPlotDetails.css';
import Web3 from 'web3'

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
  const [showAccess, setShowAccess] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [myAddress, setMyAddress] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [attachGameClicked, setAttachGameClicked] = useState(false);
  const [newPrice, setNewPrice] = useState(0);
  const [SellClicked, setSellClicked] = useState(false);

  
  const marketPlaceContractAddress = "0xc189be134B7501b5f0dF448b9d0843A01f2A3EFc";
  const myMarketPlaceContract = new web3.eth.Contract(marketPlace.abi, marketPlaceContractAddress);

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
  

  const handleNftBuy = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
  
    const tokenId = id;
    const ownerPlot = backendData.find((plot) => plot.id === tokenId);
    const flatNftContractAddress = "0x7BcEB50c0659D673b888FebFc72Eea0ABEabd42B";
    if (!ownerPlot) {
      console.log(`No plot found with ID ${tokenId}`);
      return;
    }
  
    // console.log(ownerPlot);
    const price = ownerPlot.price;
    // console.log(price);
    const options = {
      from: account,
      value: price + web3.utils.toWei('0.1', 'ether'), // Add the price to the listing fee
      gasPrice: web3.utils.toWei('30', 'gwei').toString(),
    };
  
    try {
      const myMarketPlaceContract = new web3.eth.Contract(marketPlace.abi, marketPlaceContractAddress);
  
      const transaction = await myMarketPlaceContract.methods
        .buyNft(flatNftContractAddress, tokenId)
        .send(options);
      console.log('Transaction:', transaction);
  
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
  
  const handleOk = (url) => {  
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
  
  

  const handleSell = () => {
    setShowBack(true);
    setSellClicked(true);
    console.log('sell');
  };

  const handleSetPrice = () => {
    setShowBack(true);
    console.log('set price');
  };

  const handleShowHistory = async () => {
    setShowBack(true);
    console.log('showing history');
  
    try {
      // Get the list of transaction hashes for the plot from the smart contract
      const accounts = await web3.eth.getAccounts();
      const myMarketPlaceContract = new web3.eth.Contract(marketPlace.abi, marketPlaceContractAddress, {
        gasPrice: '1000000000', // 1 gwei (in wei)
        gas: 500000 // set gas limit to 500,000
      });
      
      const flatNftContractAddress = "0x7BcEB50c0659D673b888FebFc72Eea0ABEabd42B";
      const transactionHashes = await myMarketPlaceContract.methods.getOwnershipHistory(id).call();
      console.log('Transaction hashes:', transactionHashes);
  
      // Get the details for each transaction from the Ethereum blockchain
      const transactions = await Promise.all(transactionHashes.map(async (hash) => {
        const transaction = await web3.eth.getTransaction(hash);
        return transaction;
      }));
      console.log('Transactions:', transactions);
  
      // Display the transaction details in a new div in the popup
      const transactionDiv = document.createElement('div');
      transactionDiv.className = 'transaction-div';
  
      const title = document.createElement('h3');
      title.innerHTML = 'Transaction History';
      transactionDiv.appendChild(title);
  
      if (transactions.length === 0) {
        const message = document.createElement('p');
        message.innerHTML = 'No transactions found for this plot.';
        transactionDiv.appendChild(message);
      } else {
        transactions.forEach((transaction) => {
          const fromAddress = transaction.from;
          const toAddress = transaction.to;
          const value = web3.utils.fromWei(transaction.value, 'ether');
          const date = new Date(transaction.timestamp * 1000);
  
          const details = document.createElement('p');
          details.innerHTML = `From: ${fromAddress}<br>To: ${toAddress}<br>Value: ${value} ETH<br>Date: ${date.toDateString()} ${date.toLocaleTimeString()}`;
          transactionDiv.appendChild(details);
        });
      }
  
      const popupContent = document.querySelector('.popup-content');
      popupContent.appendChild(transactionDiv);
    } catch (error) {
      console.log('Error getting transaction history:', error);
    }
  };

  

  const handleAttachGame = () => {
    setShowBack(true);
    setAttachGameClicked(true);
    console.log('attach game');
  };

  const handlePlay = async () => {
    console.log('play game');
    if (backendData[id - 1].game) {
      window.open(backendData[id - 1].game, '_blank');
    } else {
      console.log('No game URL found for this plot');
    }
  };

  const handleAccess = () => {
    setShowAccess(true);
    console.log('access');
  };

  const handleBack = () => {
    setShowAccess(false);
    setShowBack(false);
    setAttachGameClicked(false);
    setSellClicked(false);

    console.log('back');
  };


  
  const renderButtons = () => {
    if (showAccess) {
      return (
        <>
          <button className="popup-sell-btn" onClick={handleSell}>Sell</button>
          {SellClicked && (
          <div className="sell-div">
            <input className="set-price-input" type="number" placeholder="Set a price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
            <button onClick={() => handleSetPriceOk(newPrice)}>OK</button>
          </div>
        )}
          {/* <button className="popup-price-btn btn" onClick={handleSetPrice}>Set Price</button> */}
          <button className="popup-transfer-btn btn" onClick={handleShowHistory}>Show History</button>
          <button className="popup-game-btn btn" onClick={handleAttachGame}>Attach Game</button>
        {attachGameClicked && (
          <div className="attach-game-div">
            <input className="game-input" type="text" placeholder="Enter game URL" value={gameUrl} onChange={(e) => setGameUrl(e.target.value)} />
            <button onClick={() => handleOk(gameUrl)}>OK</button>
          </div>
        )}
          <button className="popup-back-btn" onClick={handleBack}>Back</button>
        </>
      );
    } else if(userType === 'buyer/seller' && backendData[id - 1].onSale && backendData[id - 1]?.owner?.toLowerCase() !== myAddress?.toLowerCase()) {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
          <button className="popup-buy-btn" onClick={handleNftBuy}>Buy</button>
         
        </>
      )
    }else if(userType === 'buyer/seller' && backendData[id - 1]?.owner?.toLowerCase() == myAddress?.toLowerCase())  {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
          <button className="popup-access-btn" onClick={handleAccess}>Access</button>
        </>
      )
    } 
    else {
      return (
        <>
          <button className="popup-play-btn" onClick={handlePlay}>Play</button>
        </>
      );
    }
  };

  const ownerPlot = backendData.find(plot => plot.id === id);
  const onSale = backendData[id - 1].onSale
  const tokenId = backendData[id - 1].tokenId

  
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
          <th>Token ID*</th>
          <td>{tokenId}</td>
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