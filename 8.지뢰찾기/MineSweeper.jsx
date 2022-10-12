import React from 'react';
import Table from './Table';
import Form from './Form'

// class MineSweeper extends Component {
//     state = {

//     }

//     render() {
//         return (
//             <>
//                 HelloWorld
//             </>
//         );
//     }
// }


const { useState, useRef, useEffect, useMemo, useCallback, useReducer, memo, createContext } = React;

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => { },
});
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICK_MINE: -6,
    OPENED: 0,
}
export const START_GAME = 'START_GAME';
export const FLAG_CELL = 'FLAG_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const OPEN_CELL = 'OPEN_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const initialstate = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
}

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                halted: false,
                tableData: plateMine(action.row, action.col, action.mine),
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.OPENED;
            let around = [];
            if(tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row - 1][action.col - 1],
                    tableData[action.row - 1][action.col],
                    tableData[action.row - 1][action.col + 1],
                );
            }
            
            around = around.concat(
                tableData[action.row][action.col - 1],
                tableData[action.row][action.col + 1],
            );

            if(tableData[action.row + 1]) {
                around = around.concat(
                    tableData[action.row + 1][action.col - 1],
                    tableData[action.row + 1][action.col],
                    tableData[action.row + 1][action.col + 1],
                );
            }
            let count = around.filter(cell => [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(cell)).length;
            tableData[action.row][action.col] = count;
            return {
                ...state,
                tableData,
            };
        }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICK_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.MINE) {
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            console.log()
            if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
                tableData[action.row][action.col] = CODE.MINE;
            }
            else {
                tableData[action.row][action.col] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
}

const plateMine = (row, col, mine) => {
    console.log(row, col, mine);
    const candidate = Array(row * col).fill().map((v, i) => i);
    const shuffle = [];
    while (candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    for (let k = 0; k < shuffle.length; k++) {
        const split = shuffle[k].toString().split('');
        const ver = parseInt(split[0]) || 0;
        const hor = parseInt(split[1]) || 0;

        data[ver][hor] = CODE.MINE;
    }
    return data;
}

const MineSweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialstate);

    // context는 랜더링 될 때 마다 새로운 객체를 생성하므로 그 때 마다 자식 컴포넌트의 랜더링이 필연적이다.
    // 따라서 성능 최적화를 위해 useMemo로 값을 기억한다. 또한 dispatch는 바뀌는 값이 아니다.
    const value = useMemo(() => ({ tableData: state.tableData, halted: state.halted, dispatch }), [state.tableData, state.halted]);
    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};
export default MineSweeper