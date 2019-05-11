import React from 'react';
import PropTypes from 'prop-types';
import './BingoTd.scss';

const BingoTd = ({row, block, onClick}) => {
    return row.map(({ number, checked }, i) => (
        <td
            onClick={number && onClick}
            style={{
                height: block.size,
                width: block.size,
                background: checked ? '#f6f6f6' : ''
            }}
            className='BingoRow-td'
            key={i}>
            {number}
        </td>
    ))
};

BingoTd.propTypes = {
  row: PropTypes.array,
  block: PropTypes.object,
  onClick: PropTypes.func
};

export default BingoTd;