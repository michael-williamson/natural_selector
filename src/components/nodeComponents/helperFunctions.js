export const layoutObject = (windowHeight, windowWidth, numNodes) => {
  let area = windowHeight * windowWidth;
  let nodeArea = area / numNodes;
  let nodeDimensions = Math.floor(Math.sqrt(nodeArea));

  let nodesPerColumn = Math.ceil(windowHeight / (nodeDimensions * 2));
  let numberOfColumns = Math.ceil(numNodes / nodesPerColumn);
  return {
    nodeDimensions,
    nodesPerColumn,
    numberOfColumns,
  };
};

export const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

export const xyCoordinateGenerator = (num, canvasWidth, canvasHeight) => {
  function XYObject(x, y) {
    this.x = x;
    this.y = y;
  }
  const nodeArray = [];
  for (let i = 0; i < num; i++) {
    let x = Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight;
    x = Math.floor(x);
    y = Math.floor(y);
    nodeArray.push(new XYObject(x, y));
  }
  return nodeArray;
};
