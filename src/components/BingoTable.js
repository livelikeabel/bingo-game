import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BingoTd from './BingoTd.js';
import { checkBlock, calculateBingoCount } from '../reducers/bingo';
import './BingoTable.scss';

class BingoTable extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { player } = this.props;
    const prevBingoCount = prevProps.bingo[player].bingoCount;
    this.props.calculateBingoCount(player, prevBingoCount);
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

BingoTable.propTypes = {
  player: PropTypes.string.isRequired,
  bingo: PropTypes.object,
  gameStatus: PropTypes.bool,
  block: PropTypes.object
};

const mapStateToProps = ({ bingo, bingo: { gameStatus, block } }) => ({
  bingo, gameStatus, block
});
const mapDispatchToProps = { checkBlock, calculateBingoCount };

export default connect(mapStateToProps, mapDispatchToProps)(BingoTable);