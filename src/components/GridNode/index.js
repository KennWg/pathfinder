import React from "react";

function GridNode(props) {
    const {row, col, isStart, isFinish} = props;

    let startOrFinish;
    if(isStart) startOrFinish = 'isStart'
    if(isFinish) startOrFinish = 'isFinish'

    return(
        <div id={`${row},${col}`} className={`node col ${startOrFinish}`}></div>
    );
}

export default GridNode;