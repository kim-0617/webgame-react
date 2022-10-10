import React from 'react';
import ReactDom from 'react-dom/client';
import MineSweeper from './MineSweeper';

ReactDom.createRoot(document.querySelector('#root')).render(<MineSweeper />);