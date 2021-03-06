import React from "react";

function GridNode(props) {
    const {row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter} = props;

    let specialClass = '';
    if(isStart) specialClass = 'isStart';
    if(isFinish) specialClass = 'isFinish';
    if(isWall) specialClass = 'isWall';

    return(
        <div 
            id={`${row},${col}`} 
            className={`node col ${specialClass}`}
            onMouseDown={() => onMouseDown(row,col)}
            onMouseEnter={() => onMouseEnter(row,col)}>
        </div>
    );
}

export default GridNode;