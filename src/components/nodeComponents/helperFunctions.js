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
