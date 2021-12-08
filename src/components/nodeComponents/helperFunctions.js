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

export const xyCoordinateGenerator = (
  num,
  canvasWidth,
  canvasHeight,
  buffer
) => {
  function XYObject(x, y) {
    this.x = x;
    this.y = y;
  }
  const nodeArray = [];
  const bufferedWidth = canvasWidth - buffer;
  const bufferedHeight = canvasHeight - buffer;
  const bufferSquared = buffer * 2;
  for (let i = 0; i < num; i++) {
    let x = Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight;
    x = Math.floor(x);
    y = Math.floor(y);
    if (x >= bufferedWidth || x <= buffer) {
      x = x >= bufferedWidth ? x - bufferSquared : x + bufferSquared;
    }
    if (y >= bufferedHeight || y <= buffer) {
      y = y >= bufferedHeight ? y - bufferSquared : y + bufferSquared;
    }
    nodeArray.push(new XYObject(x, y));
  }
  return nodeArray;
};
