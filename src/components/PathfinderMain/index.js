import React, { useState, useEffect } from "react";
import GridNode from "../GridNode";

function PathfinderMain() {

    //Grid state
    const [state, setState] = useState([]);

    //Mousedown state
    const [mouseDown, setMouseDown] = useState(false);

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
    const startRow = 4;
    const startCol = 4;
    const finishRow = 15;
    const finishCol = 35;

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

    //Click handler for grid
    const gridClickHandler = (row, col) => {
        if(startSelected) changeStart(row,col);
        if(finishSelected) changeFinish(row,col);
        if(wallsSelected) toggleWall(row,col);
    }

    //Enter handle for grid
    const gridEnterHandler = (row, col) => {
        if(!mouseDown || !wallsSelected) return;
        toggleWall(row,col);
    }

    //Mousedown handler
    const mouseDownHandler = () => {
        setMouseDown(true);
        console.log(mouseDown);
    }

    //Mouseup handler
    const mouseUpHandler = () => {
        setMouseDown(false);
        console.log(mouseDown);
    }

    //Change start function
    const changeStart = (row, col) => {
        const newGrid = state.slice();
        
        const oldStartCoords = document.getElementsByClassName('isStart')[0].id.split(',');
        const [oldRow, oldCol] = oldStartCoords;
        const oldNode1 = newGrid[oldRow][oldCol];
        const newNode1 = {
            ...oldNode1,
            isStart: false
        }


        const oldNode2 = newGrid[row][col];
        const newNode2 = {
            ...oldNode2,
            isStart: true
        }

        newGrid[oldRow][oldCol] = newNode1;
        newGrid[row][col] = newNode2;

        setState(newGrid);
    }

    //Change finish function
    const changeFinish = (row, col) => {
        const newGrid = state.slice();
        
        const oldStartCoords = document.getElementsByClassName('isFinish')[0].id.split(',');
        const [oldRow, oldCol] = oldStartCoords;
        const oldNode1 = newGrid[oldRow][oldCol];
        const newNode1 = {
            ...oldNode1,
            isFinish: false
        }


        const oldNode2 = newGrid[row][col];
        const newNode2 = {
            ...oldNode2,
            isFinish: true
        }

        newGrid[oldRow][oldCol] = newNode1;
        newGrid[row][col] = newNode2;

        setState(newGrid);
    }

    //Toggle wall function
    const toggleWall = (row, col) => {
        const newGrid = state.slice();

        const oldNode = newGrid[row][col];
        const newNode = {
            ...oldNode,
            isWall: !oldNode.isWall
        }

        newGrid[row][col] = newNode;

        setState(newGrid);
    }

    return (
        <div className="w-100 justify-content-center" onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler}>
            <h1 className="text-center my-3">Pathfinder</h1>
            <div className="row main-button-container w-100 pb-4 justify-content-center">
                <button className="col-4 btn btn-success mx-5">Go!</button>
                <button className="col-2 btn btn-danger mx-5" onClick={makeGrid}>Reset Grid</button>
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
                                        isWall = {isWall}
                                        onMouseDown={(row,col) => gridClickHandler(row,col)}
                                        onMouseEnter={(row,col) => gridEnterHandler(row,col)}>
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