import React, { useState } from 'react';
import './Header.css';
import Web3 from 'web3';

const Header = ({ onHomeClick }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);

  const toggleConnection = async () => {
    try {
      if (window.ethereum) {
        if (connected) {
          await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
          setConnected(false);
          setAddress(null);
        } else {
          const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAddress(res[0]);
          setConnected(true);
          const web3 = new Web3(window.ethereum);
          const balance = await web3.eth.getBalance(address);
          console.log('Wallet balance:', web3.utils.fromWei(balance, 'ether'));
          const count = await web3.eth.getTransactionCount(address);
          console.log('Transaction count:', count);
          const estimate = await web3.eth.estimateGas({ from: address, to: address, value: web3.utils.toWei('0.01', 'ether') });
          console.log('Gas estimation:', estimate.toString());
          const logs = await web3.eth.getPastLogs({ fromBlock: '0x0', address: address });
          console.log('Logs:', logs);
        }
      } else {
        const messageEl = document.createElement('div');
        messageEl.textContent = 'Please install the Metamask extension.';
        messageEl.style.color = 'red';
        document.body.appendChild(messageEl);
      }
    } catch (error) {
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
      {connected ?<p>Address: {address}</p>:null}
      <button className='btn' onClick={toggleConnection}>
      Connect Wallet
      </button>
    </header>
  );
};

export default Header;
