export function dijkstra(grid, start, finish){
    const visitedNodes = [];    
    const unVisitedNodes = [];

    //Fill unvisited nodes with every node in grid
    for(const row of grid){
        for(const node of row){
            unVisitedNodes.push(node);
        }
    }

    start.distance = 0;

    //Loop over unvisited nodes
    while(unVisitedNodes.length > 0){
        //Sort to find closest node using comparator function and save it to variable
        unVisitedNodes.sort((a,b) => a.distance - b.distance);
        const closest = unVisitedNodes.shift();

        //Skip if closest node is wall, stop function if no previous nodes were converted from infinity in previous loops (no path can be found to target)
        if(closest.isWall) continue;
        if(closest.distance === infinity) return visitedNodes;

        //Set the current node to visited and push node to visited nodes array
        closest.isVisited = true;
        visitedNodes.push(closest);

        //Check if current node is end node
        if(closest === finish) return visitedNodes;

        //Get neighbours of current node to update their distance (filter the ones that have been visited already)
        const neighbours = [];
        const {col, row} = closest;

        if(row > 0) neighbours.push(grid[row -1 ][col]);
        if(row < grid.length - 1) neighbours.push(grid[row + 1][col]);
        if(col > 0) neighbours.push(grid[row][col - 1]);
        if(col < grid.length - 1) neighbours.push(grid[row][col + 1])

        neighbours = neighbours.filter(neighbour => !neighbour.isVisited);

        //For all nodes in neighbour, set their distance to distance of current node + 1, set their previous to point back to current node for backtracking later
        for(const neighbour of neighbours){
            neighbour.distance = closest.distance + 1;
            neighbour.previous = closest;
        }
    }
}

export function getShortestPath(finish){
    const pathNodes = [];

    //Loop over nodes current exists, using the previous attribute we added earlier during the dijkstra function to find path back to start
    let current = finish;
    while(current !== null){
        pathNodes.push(current);
        current = current.previous;
    }
    return pathNodes;
}