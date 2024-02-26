/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React, { useState } from 'react';
import './App.scss';
/**
 * 
 * Create a line of black-colored blocks on a white background such that they form the capital letter `C`

It should resemble something like

[][][][]
[]
[]
[]
[][][][]

Add a button somewhere such that when clicked, it will trigger a wave of green
light to travel from the top end of the letter to the other end. The light
should travel from one block to another block in 100 ms increments.

The "light" can simply be the block with a green color (optionally something
else that is more visually pleasing)


[][][][G]
[]
[]
[]
[][][][]

[][][G][]
[]
[]
[]
[][][][]

[][G][][]
[]
[]
[]
[][][][]

etc...

Clicking the button while the light is travelling should stop the light in its
path
 */

type TileValue = 0 | 1 | 2 | null | undefined;
// null means no tile
// 0 means valid tile
// 1 means light is on for this tile
// 2 means light has passed through this tile (but tile is off)
export type Tile = [number, number, TileValue]; // [row, col, val?]

export const AnimationPuzzle = ({
    numRows,
    numCols,
    validTiles,
}: {
    numRows: number;
    numCols: number;
    validTiles: Tile[];
}) => {
    const initGrid = () => {
        const newGrid = [];
        for (let r = 0; r < numRows; r++) {
            const row = [];
            for (let c = 0; c < numCols; c++) {
                row.push(null);
            }
            newGrid.push(row);
        }
        validTiles.map((tile) => {
            const [row, col, val] = tile;
            if (val !== null && val !== undefined) {
                newGrid[row][col] = val;
            }
        });
        return newGrid;
    };

    const [grid, setGrid] = useState<TileValue[][]>(
        initGrid(numCols, numRows, validTiles)
    );

    /*const getTile = (row: number, col: number): number | null => {
        return grid[row][col];
    };*/
    const getAllNeighbors = (row: number, col: number): Tile[] => {
        const neighbors: Tile[] = [];
        if (row > 0) {
            neighbors.push([row - 1, col]);
        }
        if (row < grid.length - 1) {
            neighbors.push([row + 1, col]);
        }
        if (col > 0) {
            neighbors.push([row, col - 1]);
        }
        if (col < grid[0].length - 1) {
            neighbors.push([row, col + 1]);
        }
        return neighbors;
    };
    const getFreshNeighbors = (row: number, col: number): Tile[] => {
        return getAllNeighbors(row, col).filter(([r, c]) => grid[r][c] === 0);
    };

    return (
        <div className='puzzle'>
            {grid.map((row, r) => {
                return (
                    <div key={`${r}`} className='row'>
                        {row.map((item, c) => {
                            return (
                                <Block
                                    key={`${r} ${c}`}
                                    row={r}
                                    col={c}
                                    grid={grid}
                                    setGrid={setGrid}
                                    getFreshNeighbors={getFreshNeighbors}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

const Block = ({
    row,
    col,
    grid,
    setGrid,
    getFreshNeighbors,
}: {
    row: number;
    col: number;
    grid: TileValue[][];
    setGrid: (grid: TileValue[][]) => void;
    getFreshNeighbors: (row: number, col: number) => Tile[];
}) => {
    const value = grid[row][col];
    const isLit = value === 1;
    const isDone = value === 2;
    const [changing, setChanging] = useState(false);

    // sets self to 1 when clicked
    const prepLightUp = () => {
        const newGrid = [...grid];
        if (value === 0) {
            newGrid[row][col] = 1;
            setGrid(newGrid);
        }
    };

    // finishes self and lights neighbors after render
    const lightUp = () => {
        if (changing) return;
        setChanging(true);
        setTimeout(() => {
            // after 100ms, set to 2
            const newGrid = [...grid];
            newGrid[row][col] = 2;
            setGrid(newGrid);
            lightNeighbors();
            setChanging(false);
        }, 100);
    };
    const lightNeighbors = () => {
        const freshNeighbors = getFreshNeighbors(row, col);
        const newGrid = [...grid];
        freshNeighbors.map(([r, c]) => {
            newGrid[r][c] = 1;
        });
        setGrid(newGrid);
    };

    // If lit up, call lightUp immediately
    if (isLit && !changing) {
        lightUp();
    } else if (isDone) {
        setTimeout(() => {
            // resets from 2 to 0
            const newGrid = [...grid];
            newGrid[row][col] = 0;
            setGrid(newGrid);
        }, 500);
    }

    return (
        <div
            className={`myblock ${isLit ? 'lit' : isDone ? 'done' : ''}`}
            onClick={prepLightUp}
        >
            {value}
        </div>
    );
};
