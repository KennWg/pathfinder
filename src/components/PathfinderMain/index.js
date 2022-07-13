import React, { useState, useEffect, useRef } from "react";
import GridNode from "../GridNode";
import { dijkstra, getShortestPath} from "../../algorithms";

function PathfinderMain() {

    //Grid state
    const [state, setState] = useState([]);

    //Mousedown state
    const [mouseDown, setMouseDown] = useState(false);

    //Button states with variables for their class names
    const [startSelected, setStart] = useState(false);
    const [finishSelected, setFinish] = useState(false);
    const [wallsSelected, setWalls] = useState(false);

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
    let startRow = useRef(4);
    let startCol = useRef(4);
    let finishRow = useRef(15);
    let finishCol = useRef(35);

    //Make new grid on page load
    useEffect(() => {
        makeGrid();
    }, []);

    //Function to make a node object
    const makeNode = (row, col) => {
        return {
            row,
            col,
            isStart: (row === startRow.current && col === startCol.current),
            isFinish: (row === finishRow.current && col === finishCol.current),
            isWall: false,
            isVisited: false,
            distance: Infinity
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

    //Function to reset grid
    const resetGrid = async () => {
        window.location.reload(false);
    }


    //Functions related to handling clicks for manipulation of grid

    //Click handler for grid
    const gridClickHandler = (row, col) => {
        if (startSelected) changeStart(row, col);
        if (finishSelected) changeFinish(row, col);
        if (wallsSelected) toggleWall(row, col);
    }

    //Enter handle for grid
    const gridEnterHandler = (row, col) => {

        if (!mouseDown || !wallsSelected) return;
        toggleWall(row, col);
    }

    //Mousedown handler
    const mouseDownHandler = () => {
        setMouseDown(true);
    }

    //Mouseup handler
    const mouseUpHandler = () => {
        setMouseDown(false);
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

        if(oldNode2.isFinish || oldNode2.isWall) return;

        newGrid[oldRow][oldCol] = newNode1;
        newGrid[row][col] = newNode2;

        startRow.current = row;
        startCol.current = col;
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

        if(oldNode2.isStart || oldNode2.isWall) return;

        newGrid[oldRow][oldCol] = newNode1;
        newGrid[row][col] = newNode2;

        finishRow.current = row;
        finishCol.current = col;
        setState(newGrid);
    }

    //Toggle wall function
    const toggleWall = (row, col) => {
        const newGrid = state.slice();

        const oldNode = newGrid[row][col];

        if(oldNode.isStart || oldNode.isFinish) return;

        const newNode = {
            ...oldNode,
            isWall: !oldNode.isWall
        }

        newGrid[row][col] = newNode;

        setState(newGrid);
    }




    //Functions related to pathfinding
    
    //Function to begin pathfinding and call other functions
    const startDijkstra = () => {
        const start = state[startRow.current][startCol.current];
        const finish = state[finishRow.current][finishCol.current];

        const visitedNodes = dijkstra(state, start, finish);
        const shortestPath = getShortestPath(finish);

        animateDijkstra(visitedNodes, shortestPath);
    }

    const animateDijkstra = (visitedNodes, shortestPath) => {
        //loop through the array in order of the search
        for(let i = 0; i <= visitedNodes.length; i++){
            //If the array of nodes is empty, we can set the timeout to animate the shortest path
            if(i === visitedNodes.length){
                setTimeout(() => {
                    for(let j = shortestPath.length - 1; j >= 0; j--){
                        setTimeout(() => {
                            const node = shortestPath[j];
                            document.getElementById(`${node.row},${node.col}`).className = 'node node-shortest-path col';
                        }, 10 * j)
                    }
                }, 10 * i)
            } else {
                setTimeout(() => {
                    const node = visitedNodes[i];
                    document.getElementById(`${node.row},${node.col}`).className = 'node node-visited col';
                }, 10 * i)
            }
        }
    }

    //Returned display

    return (
        <div className="w-100 justify-content-center" onMouseUp={mouseUpHandler} onMouseDown={mouseDownHandler}>
            <h1 className="text-center my-3">Pathfinder</h1>
            <div className="row main-button-container w-100 pb-4 justify-content-center">
                <button className="col-4 btn btn-success mx-5" onClick={startDijkstra}>Go!</button>
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
                                        isWall={isWall}
                                        onMouseDown={(row, col) => gridClickHandler(row, col)}
                                        onMouseEnter={(row, col) => gridEnterHandler(row, col)}>
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