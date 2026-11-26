import React, { Component } from 'react';

import TileGrid from './TileGrid';
import AppHeader from './AppHeader';
import Footer from './Footer';
import GameStats from './GameStats';
import tileFactory from './tile-factory';
import { GAME_WON, GAME_STARTED } from './game-states';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.onTileClick = this.onTileClick.bind(this);
    this.onTileFlip = this.onTileFlip.bind(this);
    this.onRestartGame = this.onRestartGame.bind(this);
    this.onNewGame = this.onNewGame.bind(this);

    this.state = {
      ...tileFactory.newGame(),
      gameId: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <AppHeader
          moves={this.state.moves}
          onNewGame={this.onNewGame}
          onRestart={this.onRestartGame}
        />
        <div className="App-content">
          <GameStats
            moves={this.state.moves}
            gameState={this.state.gameState}
            onRestart={this.onRestartGame}
          />
          <TileGrid
            tiles={this.state.tiles}
            gameId={this.state.gameId}
            onClick={this.onTileClick}
            onFlip={this.onTileFlip}
          />
        </div>
        <Footer />
      </div>
    );
  }

  onTileClick(tile) {
    const matchingTile = this._getMatchingTile(tile);
    if (matchingTile.temporarilyFlipped) {
      const modifiedTiles = [].concat(this.state.tiles).map(t => {
        if (t.id === tile.id || t.id === matchingTile.tile.id) {
          return {
            ...t,
            flipped: true,
          };
        }

        return t;
      });

      // Check if game has been won
      const gameWon = modifiedTiles.reduce(
        (result, tile) => {
          return result && tile.flipped;
        },
        true,
      );

      this.setState({
        tiles: modifiedTiles,
        gameState: gameWon ? GAME_WON : GAME_STARTED,
      });
    }

    // Increment number of game moves
    this.setState((prevState, props) => ({
      moves: prevState.moves + 1,
    }));
  }

  onTileFlip(tileId, isFlipped) {
    const temporaryFlippedTiles = Object.assign(
      {},
      this.state.temporaryFlippedTiles,
      {
        [tileId]: isFlipped,
      },
    );

    this.setState({
      temporaryFlippedTiles,
    });
  }

  onRestartGame() {
    // Reset moves but keep the same tiles in their original shuffled order
    this.setState(prevState => ({
      moves: 0,
      gameState: GAME_STARTED,
      temporaryFlippedTiles: {},
      tiles: prevState.tiles.map(tile => ({
        ...tile,
        flipped: false,
      })),
    }));
  }

  onNewGame() {
    // Generate completely new game with new tiles
    this.setState(prevState => ({
      ...tileFactory.newGame(),
      gameId: prevState.gameId + 1,
    }));
  }

  _getMatchingTile(tile) {
    // Search for matching tile and see if it's also flipped
    const matchingTile = this.state.tiles.find(t => {
      return t.id !== tile.id && t.name === tile.name;
    });

    return {
      tile: matchingTile,
      temporarilyFlipped: this.state.temporaryFlippedTiles[matchingTile.id],
    };
  }
}

export default App;
