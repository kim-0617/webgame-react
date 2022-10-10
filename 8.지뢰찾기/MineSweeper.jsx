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
    tableData : [],
    dispatch : () => {}
});
export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAGE_MINE : -5,
    CLICK_MINE : -6,
    OPENED : 0,
}
export const START_GAME = 'START_GAME';

const initialstate = {
    tableData : [],
}

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME:
            return {
                ...state,
                tableData : plateMine(action.row, action.col, action.mine),
            };
        default:
            return state;
    }
}

const plateMine = (row, col, mine) => {
    console.log(row, col, mine);
    const candidate = Array(row * col).fill().map((v, i) => i);
    const shuffle = [];
    while(candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < col; j++){
            rowData.push(CODE.NORMAL);
        }
    }
    for(let k = 0; k < shuffle.length; k++) {
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
    const value = useMemo(() => ({tableData : state.tableData, dispatch}), [state.tableData]);
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