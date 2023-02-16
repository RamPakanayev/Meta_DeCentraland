import React from 'react';
import './Header.css';

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
    </header>
  );
};

export default Header;
