import React, { memo, useContext } from 'react';
import { TableContext, CODE } from './MineSweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#555',
            }
        case CODE.OPENED:
            return {
                background: '#FFF',
            }
        default:
            return {
                background: '#FFF',
            }
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        default:
            return '';
    }
}

const Td = ({ rowIndex, colIndex }) => {
    const { tableData } = useContext(TableContext);

    return (
        <td style={getTdStyle(tableData[rowIndex][colIndex])}>{getTdText(tableData[rowIndex][colIndex])}</td>
    );
};

export default Td;