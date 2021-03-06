import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BingoTable from './components/BingoTable';
import { setGameStatus, compareBingoResult } from './reducers/bingo';
import './App.scss';

class App extends Component {

  componentDidUpdate() {
    const { player1, player2 } = this.props;
    if (player1.bingoCount >= 5 || player2.bingoCount >= 5) {
      this.props.compareBingoResult();
    }
  }

  render() {
    const { setGameStatus, gameStatus, player1, player2 } = this.props;
    return (
      <div className="App">
        <h1>BIIIIINGO GAME!!!!</h1>
        <button
          onClick={() => setGameStatus(!gameStatus)}
        >
          {gameStatus ? 'RESTART' : 'START'}
        </button>
        <div className="App-bingoWrapper">
          <div style={{ opacity: !player1.turn && 0.3 }}>
            <h3>P1 Bingo Count: {player1.bingoCount}</h3>
            <BingoTable player={'player1'} />
          </div>
          <div style={{ opacity: !player2.turn && 0.3 }}>
            <h3>P2 Bingo Count: {player2.bingoCount}</h3>
            <BingoTable player={'player2'} />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  gameStatus: PropTypes.bool,
  player1: PropTypes.object,
  player2: PropTypes.object,
  setGameStatus: PropTypes.func,
  compareBingoResult: PropTypes.func
};

const mapStateToProps = ({ bingo: { gameStatus, player1, player2 } }) => ({
  gameStatus, player1, player2
});
const mapDispatchToProps = { setGameStatus, compareBingoResult };

export default connect(mapStateToProps, mapDispatchToProps)(App);
