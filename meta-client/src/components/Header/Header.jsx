import React, { useState } from 'react';
import './Header.css';
import Web3 from 'web3';

const Header = ({ onHomeClick, web3 }) => {
  // state to keep track of the wallet connection status and user's wallet address
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);

  // function to toggle wallet connection using Metamask
  const toggleConnection = async () => {
    try {
      // check if Metamask is installed
      if (window.ethereum) {
        // request user's wallet account(s)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // set the user's wallet address
        setAddress(accounts[0]); 

        // set the wallet connection status to connected
        setConnected(true); 

        // create a new instance of Web3 using the provider from Metamask
        const web3 = new Web3(window.ethereum);

        // get user's wallet balance in ETH
        const balance = await web3.eth.getBalance(accounts[0]);

        console.log('Wallet balance:', web3.utils.fromWei(balance, 'ether'));
       
        // get user's transaction count
        const count = await web3.eth.getTransactionCount(accounts[0]);
        console.log('Transaction count:', count);
       
        // estimate gas required for a transaction with a specific value
        const estimate = await web3.eth.estimateGas({ from: accounts[0], to: accounts[0], value: web3.utils.toWei('0.01', 'ether') });
        console.log('Gas estimation:', estimate.toString());
       
        // get past logs from user's wallet address
        const logs = await web3.eth.getPastLogs({ fromBlock: '0x0', address: accounts[0] });
        console.log('Logs:', logs);
      
      } else {
        // if Metamask is not installed, show a message to the user
        const messageEl = document.createElement('div');
        messageEl.textContent = 'Please install the Metamask extension.';
        messageEl.style.color = 'red';
        document.body.appendChild(messageEl);
      }
    } catch (error) {
      // handle errors while connecting to Metamask
      console.error('Error connecting to Metamask:', error);
    }
  };

  return (
    <header className="header">
      <img className="logo" src="/logo.png" alt="Meta_DeCentraland Logo" />
      <nav className="nav-menu">
        <ul>
          <li>
            <a href="#" onClick={onHomeClick}>
              Home
            </a>
          </li>
          <li>
            <a href="#">Buy</a>
          </li>
          <li>
            <a href="#">Sell</a>
          </li>
          <li>
            <a href="#">Games</a>
          </li>
        </ul>
      </nav>
      {connected ? <p>Address: {address}</p> : null}
      <button className='btn' onClick={toggleConnection}>
        Connect Wallet
      </button>
    </header>
  );
};

export default Header;
