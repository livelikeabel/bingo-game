import React, { Component } from 'react';
import { connect } from 'react-redux';
import BingoTd from './BingoTd.js';
import { checkBlock, setBingoCount, setGameStatus } from '../reducers/bingo';
import './BingoTable.scss';

class BingoTable extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // 빙고 점수를 계산하는 로직
    this._calculateBingoCount(prevProps);

    // 빙고게임의 종료 로직이 있다. 옮겨야 한다.
    this._checkBingoCompleted();
  }

  _calculateBingoCount = prevProps => {
    const { setBingoCount, player } = this.props;
    const bingoCount = this._countBingo();
    if (prevProps.bingo[player].bingoCount !== bingoCount) {
      setBingoCount(player, bingoCount);
    }
  }

  _checkBingoCompleted = () => {
    const { bingo, bingo: { player1, player2 }, player } = this.props;
    if (bingo[player].bingoCount >= 5) {
      player1.bingoCount === player2.bingoCount ?
        alert('무승부 입니다 :)') :
        alert(`${player}가 빙고를 완성했습니다!`);
      this.props.setGameStatus(false);
    }
  }

  _countBingo = () => {
    const { bingo, player } = this.props;
    const { stage } = bingo[player];
    let bingoCount = 0;
    // 행검사
    stage.forEach(row => {
      const checkeds = row.filter(block => block.checked === true);
      if (checkeds.length === 5) bingoCount++
    })
    // 열검사
    stage.forEach((row, i) => {
      let colCount = 0;
      row.forEach((_, j) => {
        if (stage[j][i].checked) colCount++;
      })
      if (colCount === 5) bingoCount++;
    })
    // 왼쪽 대각선 검사
    const leftDiagonal = stage.filter((_, i) => stage[i][i].checked === true)
    if (leftDiagonal.length === 5) bingoCount++;

    // 오른쪽 대각선 검사
    const rightDiagonal = stage.filter((row, i) => {
      return stage[row.length - (i + 1)][i].checked === true
    })
    if (rightDiagonal.length === 5) bingoCount++;

    return bingoCount
  }

  // 비지니스 로직
  _getBlock = (pageX, pageY) => {
    const { block: { size, row, col }, bingo, player } = this.props
    const { stage } = bingo[player]
    console.log(this.table);
    const { top, left } = this.table.current.getBoundingClientRect()
    if (pageX < left || pageX > (left + size * row) ||
      pageY < top || pageY > (top + size * col)
    ) return null;
    return stage[parseInt((pageY - top) / size)][parseInt((pageX - left) / size)]
  }

  _handleClickTd = ({ pageX, pageY }) => {
    const { player } = this.props;
    const tableRect = this.table.current.getBoundingClientRect();
    this.props.checkBlock(player, { pageX, pageY }, tableRect);
  }

  _renderRows = () => {
    const { player, bingo, block } = this.props;
    return bingo[player].stage.map((row, i) => (
      <tr key={i}>
        <BingoTd row={row} block={block} onClick={this._handleClickTd} />
      </tr>
    ))
  }

  render() {
    return (
      <table ref={this.table} className='BingoTable'>
        <tbody>
          {this._renderRows()}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = ({ bingo, bingo: { gameStatus, block } }) => ({
  bingo, gameStatus, block
});
const mapDispatchToProps = { checkBlock, setBingoCount, setGameStatus };

export default connect(mapStateToProps, mapDispatchToProps)(BingoTable);