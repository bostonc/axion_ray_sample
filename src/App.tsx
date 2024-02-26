import React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import { ControlledForm } from './Form';
import { AnimationPuzzle, type Tile } from './AnimationPuzzle';

// array of coords [row, col, val?]
const defaultTiles: Tile[] = [
    [0, 3, 0],
    [0, 2, 0],
    [0, 1, 0],
    [0, 0, 0],
    [2, 3, 0],
    [2, 2, 0],
    [2, 1, 0],
    [1, 0, 0],
    [2, 0, 0],
    [3, 0, 0],
    [4, 0, 0],
    [4, 1, 0],
    [4, 2, 0],
    [4, 3, 0],
    [1, 3, 0],
    [3, 3, 0],
];

function App() {
    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>
            <AnimationPuzzle
                numRows={5}
                numCols={4}
                validTiles={defaultTiles}
            />
            <h1>GitHub API Test</h1>
            <ControlledForm />
        </>
    );
}

export default App;
