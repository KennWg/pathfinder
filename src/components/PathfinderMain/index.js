import React, { useState, useEffect } from "react";
import GridNode from "../GridNode";

function PathfinderMain() {

    const [state, setState] = useState([]);

    //Make new grid on page load
    useEffect(() => {
        makeGrid();
    }, []);


    //Function to make a node object
    const makeNode = (row, col) => {
        return {
            row,
            col
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

    return (
        <div className="w-100 justify-content-center">
            <h1 className="text-center my-3">Pathfinder</h1>
            <div className="row main-button-container w-100 pb-4 justify-content-center">
                <button className="col-4 btn btn-success mx-5">Go!</button>
                <button className="col-2 btn btn-danger mx-5">Reset Grid</button>
                <button className="col-2 btn btn-secondary mx-5">Use Sample Grid</button>
            </div>
            <div className="row toolbar w-100 pb-4 justify-content-center">
                <button className="col-3 btn btn-info mx-5">Set Start</button>
                <button className="col-3 btn btn-info mx-5">Set End</button>
                <button className="col-3 btn btn-info mx-5">Toggle Walls</button>
            </div>
            <div className="grid-container py-2 w-75 align-items-end justify-content-center d-flex flex-column">
                {state.map((row, i) => {
                    return (
                        <div key={i} className="row d-flex">
                            {row.map((node, j) => {
                                const { row, col } = node;
                                return (
                                    <GridNode
                                        key={j}
                                        col={col}
                                        row={row}>
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