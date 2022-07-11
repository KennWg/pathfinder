import React from "react";

function GridNode(props) {
    const {row, col} = props;

    return(
        <div id={`${row},${col}`} className="node col"></div>
    );
}

export default GridNode;