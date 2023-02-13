import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="#"><i className="fa fa-facebook"></i></a>
        <a href="#"><i className="fa fa-twitter"></i></a>
        <a href="#"><i className="fa fa-instagram"></i></a>
      </div>
      <div className="copyright">
        &copy; 2023 R&L Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
