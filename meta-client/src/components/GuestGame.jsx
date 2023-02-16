import React from 'react';

const GuestGame = ({ plots, onClose, onPlayGame }) => {
  const gamePlots = plots.filter((plot) => plot.gameId !== null);

  return (
    <div className="guest-game">
      <h2>Play a Game</h2>
      <ul>
        {gamePlots.map((plot) => (
          <li key={plot.id} onClick={() => onPlayGame(plot)}>
            Plot {plot.id}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default GuestGame;
