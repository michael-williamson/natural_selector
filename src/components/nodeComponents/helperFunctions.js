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
  function XYObject(x, y, index) {
    this.x = x;
    this.y = y;
    this.index = index;
  }
  const nodeArray = [];
  const bufferedWidth = canvasWidth - buffer;
  const bufferedHeight = canvasHeight - buffer;

  for (let i = 0; i < num; i++) {
    let x = Math.random() * canvasWidth;
    let y = Math.random() * canvasHeight;
    x = Math.floor(x);
    y = Math.floor(y);
    // if (x >= bufferedWidth || x <= buffer) {
    //   x = x >= bufferedWidth ? bufferedWidth : buffer;
    // }
    // if (y >= bufferedHeight || y <= buffer) {
    //   y = y >= bufferedHeight ? bufferedHeight : buffer;
    // }
    if (x >= bufferedWidth) {
      x = bufferedWidth;
    }
    if (y >= bufferedHeight) {
      y = bufferedHeight;
    }
    nodeArray.push(new XYObject(x, y, i));
  }
  return nodeArray;
};

export const xyCoordinateObject = (canvasWidth, canvasHeight, buffer) => {
  let x = Math.random() * canvasWidth;
  let y = Math.random() * canvasHeight;
  x = Math.floor(x);
  y = Math.floor(y);

  function XYObject(x, y) {
    this.x = x;
    this.y = y;
  }

  const bufferedWidth = canvasWidth - buffer;
  const bufferedHeight = canvasHeight - buffer;

  // if (x >= bufferedWidth || x <= buffer) {
  //   x = x >= bufferedWidth ? bufferedWidth : buffer;
  // }
  // if (y >= bufferedHeight || y <= buffer) {
  //   y = y >= bufferedHeight ? bufferedHeight : buffer;
  // }
  if (x >= bufferedWidth) {
    x = bufferedWidth;
  }
  if (y >= bufferedHeight) {
    y = bufferedHeight;
  }
  return new XYObject(x, y);
};
