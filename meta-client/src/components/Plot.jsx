import React from 'react';

const Plot = ({ id, type, owner, game, price, x, y }) => {
  let color;
  if (type === 'park') {
    color = 'green';
  } else if (type === 'road') {
    color = 'rgb(58, 56, 56)';
  } else {
    color = 'rgb(196, 196, 197)';
  }
  return (
    <div className={`plot plot-${type}`} style={{ backgroundColor: color, gridColumn: x, gridRow: y }}>
    
    </div>
  );
};

export default Plot;
