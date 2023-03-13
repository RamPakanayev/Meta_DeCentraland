import React from 'react';
import './MapGuide.css';

/* This component is responsible for rendering the map guide legend at the bottom of the screen to
help users understand the different plot colors and their meanings. */
const MapGuide = () => {
  return (
    <div className="map-guide">
      <div className="plot" style={{ backgroundColor: 'green' }}></div>
      <div className="plot-description">Park</div>
      <div className="plot" style={{ backgroundColor: 'rgb(58, 56, 56)' }}></div>
      <div className="plot-description">Road</div>
      <div className="plot" style={{ backgroundColor: 'rgb(196, 196, 197)' }}></div>
      <div className="plot-description">Regular</div>
      <div className="plot" style={{ backgroundColor: 'red' }}></div>
      <div className="plot-description">Owned</div>
      <div className="plot" style={{ backgroundColor: 'blue' }}></div>
      <div className="plot-description">Owned with game</div>
      <div className="plot" style={{ backgroundColor: 'darkorange' }}></div>
      <div className="plot-description">Owned and on sale</div>
    </div>
  );
};

export default MapGuide;
