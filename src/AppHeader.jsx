import React from 'react';
import PropTypes from 'prop-types';

import './AppHeader.css';

const AppHeader = ({ moves, onNewGame, onRestart }) => (
  <header className="App-header">
    <div className="App-header-title">
      React Puzzle Games - Memory Puzzle
    </div>
    <div className="App-header-controls">
      <button className="header-btn" onClick={onNewGame}>
        <span className="btn-icon">&#x23FB;</span>
        NEW GAME
      </button>
      <button className="header-btn" onClick={onRestart}>
        <span className="btn-icon">&#x21BB;</span>
        RESET GAME
      </button>
      <div className="header-stat">
        <span className="stat-icon">&#x1F3AF;</span>
        Moves so far:<span className="stat-value">{moves}</span>
      </div>
    </div>
  </header>
);

AppHeader.propTypes = {
  moves: PropTypes.number,
  onNewGame: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
};

AppHeader.defaultProps = {
  moves: 0,
};

export default AppHeader;
