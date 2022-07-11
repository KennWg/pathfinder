import React, { useState, useEffect } from "react";
import GridNode from "../GridNode";

function PathfinderMain() {

    //Grid state
    const [state, setState] = useState([]);

    //Button states with variables for their class names
    const [startSelected,setStart] = useState(false);
    const [finishSelected,setFinish] = useState(false);
    const [wallsSelected,setWalls] = useState(false);

    const classNameBase = "col-3 btn btn-secondary mx-5";
    const classNameClicked = "col-3 btn btn-info mx-5";

    //Click handlers for setting start, finish and walls
    const startHandler = () => {
        setStart(!startSelected);
        setWalls(false);
        setFinish(false);
    }

    const finishHandler = () => {
        setStart(false);
        setWalls(false);
        setFinish(!finishSelected);
    }

    const wallsHandler = () => {
        setStart(false);
        setWalls(!wallsSelected);
        setFinish(false);
    }

    //Set initial start and end nodes
    let startRow = 5;
    let startCol = 5;
    let finishRow = 15;
    let finishCol = 35;

    //Make new grid on page load
    useEffect(() => {
        makeGrid();
    }, []);


    //Function to make a node object
    const makeNode = (row, col) => {
        return {
            row,
            col,
            isStart: (row === startRow && col === startCol),
            isFinish: (row === finishRow && col === finishCol),
            isWall: false
        }
    };

    //Make initial blank grid with columns and rows
    const makeGrid = () => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            const curr = [];
            for (let col = 0; col < 40; col++) {
                curr.push(makeNode(row, col));
            }
            grid.push(curr);
        }
        setState(grid);
    }

    //Reset grid function
    const resetGrid = () => {
        startRow = 5;
        startCol = 5;
        finishRow = 15;
        finishCol = 35;

        makeGrid();
    }

    return (
        <div className="w-100 justify-content-center">
            <h1 className="text-center my-3">Pathfinder</h1>
            <div className="row main-button-container w-100 pb-4 justify-content-center">
                <button className="col-4 btn btn-success mx-5">Go!</button>
                <button className="col-2 btn btn-danger mx-5" onClick={resetGrid}>Reset Grid</button>
            </div>
            <div className="row toolbar w-100 pb-4 justify-content-center">
                <button className={`${startSelected && classNameClicked} ${!startSelected && classNameBase}`} onClick={startHandler}>Set Start</button>
                <button className={`${finishSelected && classNameClicked} ${!finishSelected && classNameBase}`} onClick={finishHandler}>Set Finish</button>
                <button className={`${wallsSelected && classNameClicked} ${!wallsSelected && classNameBase}`} onClick={wallsHandler}>Toggle Walls</button>
            </div>
            <div className="grid-container py-2 w-75 align-items-end justify-content-center d-flex flex-column">
                {state.map((row, i) => {
                    return (
                        <div key={i} className="row d-flex">
                            {row.map((node, j) => {
                                const { row, col, isStart, isFinish, isWall } = node;
                                return (
                                    <GridNode
                                        key={j}
                                        col={col}
                                        row={row}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        isWall = {isWall}>
                                    </GridNode>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PathfinderMain;