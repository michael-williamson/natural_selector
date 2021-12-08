import React, { useRef, useEffect, useState } from "react";
import dnaIcon from "../../media/icons/dna_helix.png";
import { getDistance } from "./helperFunctions";

export const NodeWindow = (props) => {
  const { shelterState } = props;
  const { foodState } = props;
  const { survivorStateXY } = props;
  const { setFoodStateArray } = props;
  const { setShelterStateArray } = props;
  const { canvasDimensions } = props;
  const { totalTime } = props;
  const { beginSimulation } = props;
  const { setSurvivorState } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [survivorArrayState, setSurvivorArrayState] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    let canvasWidth = canvasDimensions.canvasWidth;
    let canvasHeight = canvasDimensions.canvasHeight;
    const buffer = canvasDimensions.buffer;
    const bufferedWidth = canvasDimensions.canvasWidth - buffer;
    const bufferedHeight = canvasDimensions.canvasHeight - buffer;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.overflow = "hidden";
    const context = canvas.getContext("2d");
    contextRef.current = context;

    const icon = new Image();
    icon.src = dnaIcon;

    function Node(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.removed = false;

      this.draw = function () {
        context.drawImage(icon, this.x, this.y, 60, 60);
      };
      this.update = function () {
        if (this.x >= bufferedWidth || this.x <= buffer) {
          this.dx = -this.dx;
        }
        if (this.y >= bufferedHeight || this.y <= buffer) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      };
      this.remove = function () {
        context.clearRect(this.x, this.y, 60, 60);
      };
    }

    const nodeArray = [];
    survivorStateXY.forEach((item) => {
      let maxVelocity = 2;
      const velocityArray = [0, maxVelocity];
      let vx = velocityArray[Math.floor(Math.random() * 2)];
      let vy =
        vx === maxVelocity
          ? velocityArray[Math.floor(Math.random() * 2)]
          : maxVelocity;
      nodeArray.push(new Node(item.x, item.y, vx, vy));
    });
    setSurvivorArrayState(nodeArray);
    nodeArray.forEach((item) => item.draw());
  }, []);

  useEffect(() => {
    let start;
    const context = contextRef.current;
    const canvas = canvasRef.current;
    const nodeArray = [...survivorArrayState];
    const nodeStateArray = [];
    let countDown = totalTime;
    let firstCheck = false;
    let secondCheck = false;

    const timerID = setInterval(() => {
      if (countDown <= 15 && !firstCheck) {
        firstCheck = true;
      } else if (countDown <= 5 && !secondCheck) {
        secondCheck = true;
      }
      countDown = countDown -= 1;
      if (countDown <= 0) {
        clearInterval(timerID);
      }
    }, 1000);

    function NodeState() {
      this.foodCount = 0;
      this.shelterCount = 0;
      this.furCount = 0;
      this.eliminated = false;
    }
    nodeArray.forEach(() => {
      nodeStateArray.push(new NodeState());
    });
    const foodStateBoolArray = Array(7).fill(false);
    const shelterStateBoolArray = Array(7).fill(false);
    let foodStateLength = 7;
    let shelterStateLength = 7;
    const animateNodes = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed < 0) return;
      let totalTimeMilliseconds = totalTime * 1000;
      if (elapsed < totalTimeMilliseconds) {
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

        if (firstCheck) {
          if (
            nodeStateArray[i].foodCount < 1 ||
            nodeStateArray[i].shelterCount < 1
          ) {
            nodeArray[i].remove();
            nodeArray[i].removed = true;
            nodeStateArray[i].eliminated = true;
          }
          // first check only needs to apply to one loop
          if (i === nodeArray.length - 1) {
            firstCheck = false;
          }
        }
        if (secondCheck) {
          if (
            nodeStateArray[i].foodCount < 1 ||
            nodeStateArray[i].shelterCount < 1
          ) {
            nodeArray[i].remove();
            nodeArray[i].removed = true;
            nodeStateArray[i].eliminated = true;
          }
          // second check only needs to apply to one loop
          if (i === nodeArray.length - 1) {
            secondCheck = false;
          }
        }
        if (!nodeArray[i].removed) {
          nodeArray[i].update();
        }
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
    };
    beginSimulation && window.requestAnimationFrame(animateNodes);
  }, [beginSimulation, survivorArrayState]);

  return <canvas ref={canvasRef} id="dnaCanvas" />;
};
