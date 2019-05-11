import React, { Component } from 'react';
import { connect } from 'react-redux';
import BingoTable from './components/BingoTable';
import { setGameStatus } from './reducers/bingo';
import './App.scss';

class App extends Component {

  componentDidUpdate(prevProps) {
    // 빙고게임의 종료 로직이 있다. 옮겨야 한다.
    // this._checkBingoCompleted();
  }

  // _checkBingoCompleted = () => {
  //   const { bingo, bingo: { player1, player2 }, player } = this.props;
  //   if (bingo[player].bingoCount >= 5) {
  //     player1.bingoCount === player2.bingoCount ?
  //       alert('무승부 입니다 :)') :
  //       alert(`${player}가 빙고를 완성했습니다!`);
  //     this.props.setGameStatus(false);
  //   }
  // }

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

const mapStateToProps = ({ bingo: { gameStatus, player1, player2 } }) => ({
  gameStatus, player1, player2
});
const mapDispatchToProps = { setGameStatus };

export default connect(mapStateToProps, mapDispatchToProps)(App);
