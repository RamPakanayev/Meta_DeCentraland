import React from 'react';
import './Header.css';
import Web3 from 'web3';


async function metamaskConnection() {
  try {
    if (window.ethereum) {
      const res = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = res[0];
      console.log('Address:', address);
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(address);
      console.log('Wallet balance:', web3.utils.fromWei(balance, 'ether'));
      const count = await web3.eth.getTransactionCount(address);
      console.log('Transaction count:', count);
      const estimate = await web3.eth.estimateGas({ from: address, to: address, value: web3.utils.toWei('0.01', 'ether') });
      console.log('Gas estimation:', estimate.toString());
      const logs = await web3.eth.getPastLogs({ fromBlock: '0x0', address: address });
      console.log('Logs:', logs);
    } else {
      const messageEl = document.createElement('div');
      messageEl.textContent = 'Please install the Metamask extension.';
      messageEl.style.color = 'red';
      document.body.appendChild(messageEl);
    }
  } catch (error) {
    console.error('Error connecting to Metamask:', error);
  }
}


const Header = ({ onHomeClick }) => {
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
      <button className='btn' onClick={metamaskConnection}>Connect Wallet</button>
    </header>
  );
};

export default Header;
