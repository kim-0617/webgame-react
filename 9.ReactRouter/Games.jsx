// import React from 'react';
// import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
// import GameMatcher from './GameMatcher.jsx';

// const Games = () => {
//     return (
//         <BrowserRouter>
//             <div className='link'>
//                 <Link to="/game/gugudan">구구단</Link>
//                 <Link to="/game/word-relay">끝말잇기</Link>
//                 <Link to="/game/number-baseball">숫자야구</Link>
//                 <Link to="/game/react-test">반응속도</Link>
//                 <Link to="/game/rock-scissors-paper">가위바위보</Link>
//                 <Link to="/game/lotto-generator">로또생성기</Link>
//                 <Link to="/game/index">게임 매쳐</Link>
//             </div>
//             <div className='games'>
//                 <Routes>
//                     <Route path="/" element={<GameMatcher />} />
//                     <Route path="/game/*" element={<GameMatcher />} />
//                 </Routes>
//             </div>
//         </BrowserRouter>
//     );
// };

// export default Games;

import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <div className='link'>
                <Link to="/game/gugudan">구구단</Link>
                <Link to="/game/word-relay">끝말잇기</Link>
                <Link to="/game/number-baseball">숫자야구</Link>
                <Link to="/game/react-test">반응속도 테스트</Link>
                <Link to="/game/rock-scissors-paper">가위바위보</Link>
                <Link to="/game/lotto-generator">로또생성기</Link>
                <Link to="/game/index">게임 매쳐</Link>
            </div>
            <div className='games'>
                <Routes>
                    <Route path="/" element={<GameMatcher />} />
                    <Route path="/game/*" element={<GameMatcher />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default Games;