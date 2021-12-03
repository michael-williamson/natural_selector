import React, { useRef, useEffect } from "react";
import dnaIcon from "../../media/icons/dna_helix.png";
import { getDistance, layoutObject } from "./helperFunctions";

export const NodeWindow = (props) => {
  const { shelterState } = props;
  const { foodState } = props;
  const { setFoodStateArray } = props;
  const { setShelterStateArray } = props;
  const { canvasDimensions } = props;
  const { totalTime } = props;
  const { beginSimulation } = props;
  const { numberSurvivors } = props;
  const { setSurvivorState } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let canvasWidth = canvasDimensions.canvasWidth;
    let canvasHeight = canvasDimensions.canvasHeight;
    const numNodes = numberSurvivors;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.overflow = "hidden";
    const context = canvas.getContext("2d");
    contextRef.current = context;
    const nodeDimensionsObject = layoutObject(canvasHeight, canvasWidth, 20);
    const icon = new Image();
    icon.src = dnaIcon;
    let drawPending = false;
    function Node(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.foodCount = 0;
      this.shelterCount = 0;
      this.furCount = 0;
      this.eliminated = false;

      this.draw = function () {
        context.drawImage(icon, this.x, this.y, 60, 60);
      };
      this.update = function () {
        if (this.x > canvasWidth || this.x < 50) {
          this.dx = -this.dx;
        }
        if (this.y > canvasHeight || this.y < 50) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      };
    }
    function NodeState() {
      this.foodCount = 0;
      this.shelterCount = 0;
      this.furCount = 0;
      this.eliminated = false;
    }

    let counter = 0;
    let dyIntervals = Math.floor(
      canvasHeight / nodeDimensionsObject.nodesPerColumn
    );
    let dxIntervals = Math.floor(
      canvasWidth / nodeDimensionsObject.numberOfColumns
    );
    let topOffset = false;
    let firstColumn = true;
    let dx = 50;
    let dy = dyIntervals / 2;
    const nodeArray = [];
    const nodeStateArray = [];
    for (let i = 0; i < numNodes; i++) {
      if (firstColumn && counter === 0) {
        counter += 1;
        firstColumn = false;
      } else {
        counter += 1;
        dy += dyIntervals;
      }
      if (counter > nodeDimensionsObject.nodesPerColumn) {
        if (topOffset) {
          dy = dyIntervals / 2;
          dx += dxIntervals;
        } else {
          dy = 50;
          dx += dxIntervals;
        }
        counter = 1;
        topOffset = !topOffset;
      }
      let maxVelocity = 2;
      const velocityArray = [0, maxVelocity];
      let vx = velocityArray[Math.floor(Math.random() * 2)];
      let vy =
        vx === maxVelocity
          ? velocityArray[Math.floor(Math.random() * 2)]
          : maxVelocity;
      nodeArray.push(new Node(dx, dy, vx, vy));
      nodeStateArray.push(new NodeState());
    }
    nodeArray.forEach((item) => item.draw());

    let start;
    const foodStateBoolArray = Array(foodState.length).fill(false);
    const shelterStateBoolArray = Array(shelterState.length).fill(false);
    let foodStateLength = foodState.length;
    let shelterStateLength = shelterState.length;
    const animateNodes = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed < 0) return;
      let totalTimeMilliseconds = totalTime * 1000;
      if (elapsed < totalTimeMilliseconds && drawPending === false) {
        drawPending = true;
        window.requestAnimationFrame(animateNodes);
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      let updatedFoodState, updatedShelterState;
      for (let i = 0; i < nodeArray.length; i++) {
        updatedFoodState = foodState.filter((item, index) => {
          if (foodStateBoolArray[index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, nodeArray[i].x, nodeArray[i].y) < 50
          ) {
            foodStateBoolArray[index] = true;
            nodeStateArray[i].foodCount = nodeStateArray[i].foodCount += 1;
            return false;
          }
          return true;
        });
        updatedShelterState = shelterState.filter((item, index) => {
          if (shelterStateBoolArray[index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, nodeArray[i].x, nodeArray[i].y) < 50
          ) {
            shelterStateBoolArray[index] = true;
            nodeStateArray[i].shelterCount = nodeStateArray[
              i
            ].shelterCount += 1;
            return false;
          }
          return true;
        });

        nodeArray[i].update();
      }
      if (
        foodStateLength > updatedFoodState.length ||
        shelterStateLength > updatedShelterState.length
      ) {
        foodStateLength = updatedFoodState.length;
        shelterStateLength = updatedShelterState.length;
        setSurvivorState([...nodeStateArray]);
        setFoodStateArray([...foodStateBoolArray]);
        setShelterStateArray([...shelterStateBoolArray]);
      }

      drawPending = false;
    };
    beginSimulation && window.requestAnimationFrame(animateNodes);
  }, [
    totalTime,
    beginSimulation,
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    foodState,
    numberSurvivors,
    setFoodStateArray,
    setShelterStateArray,
    setSurvivorState,
    shelterState,
  ]);

  return <canvas ref={canvasRef} id="dnaCanvas" />;
};
