import React from 'react';

import GuGuDan from '../1.구구단/GuGuDan';
import WordRelay from '../2.끝말잇기/WordRelay';
import NumberBaseball from '../3.숫자야구/NumberBaseball';
import ReactTest from '../4.반응속도/ReactTest';
import RSP from '../5.가위바위보/RSP';
import Lotto from '../6.로또추첨기/Lotto';
import TicTacToe from '../7.틱택토/TicTacToe';

import { useLocation, useNavigate, Routes, Route } from 'react-router';
const { useState, useRef, useEffect, useMemo, useCallback, useReducer, memo } = React;

const GameMatcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let urlSearchParams = new URLSearchParams(location.search.slice(1));
  console.log(urlSearchParams.get('hello'));
  console.log(urlSearchParams.get('page'));
  return (
    <Routes>
      <Route path="gugudan" element={<GuGuDan />} />
      <Route path="word-relay" element={<WordRelay />} />
      <Route path="number-baseball" element={<NumberBaseball />} />
      <Route path="react-test" element={<ReactTest />} />
      <Route path="rock-scissors-paper" element={<RSP />} />
      <Route path="lotto-generator" element={<Lotto />} />
      <Route path="tictactoe" element={<TicTacToe />} />
      <Route
        path="*"
        element={<div>
          일치하는 게임이 없습니다.
        </div>}
      />
    </Routes>
  );
}

export default GameMatcher;