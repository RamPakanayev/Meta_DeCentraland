import React from 'react';
import './Footer.css';

// Define the Footer component
const Footer = () => {
  return (
    // Create a footer element with class "footer"
    <footer className="footer">
      {/* Create a div element with class "social-media" that contains links to social media pages */}
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
