import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flipped: props.flipped,
      pendingAnimationId: 0,
      prevFlippedProp: props.flipped,
      initialized: false,
    };
  }

  componentDidMount() {
    // Enable animations after initial render
    requestAnimationFrame(() => {
      this.setState({ initialized: true });
    });
  }

  render() {
    const classes = [
      'Tile-card',
      this.state.flipped ? 'flipped' : '',
      !this.state.initialized ? 'no-transition' : '',
    ].filter(Boolean).join(' ');

    return (
      <section className="Tile-container" onClick={this._flipCard.bind(this)}>
        <div className={classes}>
          <figure className="front">
            <div className="front-content">
              <span className="question-mark">?</span>
            </div>
          </figure>
          <figure className="back">
            <div style={this._getCardStyles(this.props.logo)} />
          </figure>
        </div>
      </section>
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.flipped !== prevState.prevFlippedProp) {
      return {
        flipped: nextProps.flipped,
        prevFlippedProp: nextProps.flipped,
        pendingAnimationId: 0,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.flipped !== this.state.flipped) {
      this.props.onFlip(this.props.id, this.state.flipped);
    }
    if (prevProps.flipped !== this.props.flipped && this.props.flipped !== prevState.flipped) {
      this._cancelAnimation();
    }
  }

  _enqueueAnimation(interval = 2000) {
    const timeout = setTimeout(this._internalFlipCard.bind(this), interval);
    this.setState({
      pendingAnimationId: timeout,
    });
  }

  _cancelAnimation() {
    if (this.state.pendingAnimationId) {
      clearTimeout(this.state.pendingAnimationId);
      this.setState({
        pendingAnimationId: 0,
      });
    }
  }

  _flipCard() {
    this._internalFlipCard();

    // Enqueue a flip back to its original state
    // only if we don't already have a pending one, otherwise
    // cancel it.
    // The animation only works if the card hasn't already
    // been flipped via props.
    if (!this.state.pendingAnimationId) {
      if (!this.props.flipped) {
        this._enqueueAnimation();
      }
    } else {
      this._cancelAnimation();
    }

    // Call public callback
    this.props.onClick();
  }

  _internalFlipCard() {
    this.setState((prevState, props) => {
      if (!props.flipped) {
        return {
          flipped: !prevState.flipped,
          pendingAnimationId: 0,
        };
      } else {
        // If props.flipped is True then this card cannot be flipped again
        return {
          flipped: true,
          pendingAnimationId: 0,
        };
      }
    });
  }

  _getCardStyles(logo = 'default.png') {
    return {
      backgroundImage: `url('assets/${logo || 'default.png'}')`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundOrigin: 'border-box',
      backgroundSize: 48,
      width: '100%',
      height: '100%',
    };
  }
}

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  flipped: PropTypes.bool,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

Tile.defaultProps = {
  flipped: false,
};

export default Tile;
