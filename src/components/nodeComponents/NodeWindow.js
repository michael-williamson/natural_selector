import React, { useRef, useEffect } from "react";
import dnaIcon from "../../media/icons/dna_helix.png";
import { getDistance } from "./helperFunctions";

const icon = new Image();
icon.src = dnaIcon;

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

  useEffect(() => {
    const canvas = canvasRef.current;
    let canvasWidth = canvasDimensions.canvasWidth;
    let canvasHeight = canvasDimensions.canvasHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.overflow = "hidden";
    const context = canvas.getContext("2d");
    contextRef.current = context;

    function Survivor(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.removed = false;

      this.draw = function () {
        context.drawImage(icon, this.x, this.y, 60, 60);
      };
    }

    const survivorStateArray = [];
    survivorStateXY.forEach((item) => {
      let maxVelocity = 2;
      const velocityArray = [0, maxVelocity];
      let vx = velocityArray[Math.floor(Math.random() * 2)];
      let vy =
        vx === maxVelocity
          ? velocityArray[Math.floor(Math.random() * 2)]
          : maxVelocity;
      survivorStateArray.push(new Survivor(item.x, item.y, vx, vy));
    });
    survivorStateArray.forEach((item) => item.draw());
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    survivorStateXY,
  ]);

  useEffect(() => {
    if (!beginSimulation) return;
    let start;
    const context = contextRef.current;
    const buffer = canvasDimensions.buffer;
    const bufferedWidth = canvasDimensions.canvasWidth - buffer;
    const bufferedHeight = canvasDimensions.canvasHeight - buffer;
    const canvas = canvasRef.current;

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

    function SurvivorCount() {
      this.foodCount = 0;
      this.shelterCount = 0;
      this.furCount = 0;
      this.eliminated = false;
    }

    function Survivor(x, y, dx, dy) {
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
    const survivorStateArray = [];
    const survivorCountArray = [];

    survivorStateXY.forEach((item) => {
      let maxVelocity = 2;
      const velocityArray = [0, maxVelocity];
      let vx = velocityArray[Math.floor(Math.random() * 2)];
      let vy =
        vx === maxVelocity
          ? velocityArray[Math.floor(Math.random() * 2)]
          : maxVelocity;
      survivorStateArray.push(new Survivor(item.x, item.y, vx, vy));
      survivorCountArray.push(new SurvivorCount());
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
      survivorStateArray.forEach((survivorItem, survivorIndex) => {
        updatedFoodState = foodState.filter((item, index) => {
          if (foodStateBoolArray[index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, survivorItem.x, survivorItem.y) < 50
          ) {
            foodStateBoolArray[index] = true;
            survivorCountArray[survivorIndex].foodCount += 1;
            setSurvivorState((prev) => {
              prev[survivorIndex].foodCount += 1;
              return [...prev];
            });
            return false;
          }
          return true;
        });
        updatedShelterState = shelterState.filter((item, index) => {
          if (shelterStateBoolArray[index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, survivorItem.x, survivorItem.y) < 50
          ) {
            shelterStateBoolArray[index] = true;
            survivorCountArray[survivorIndex].shelterCount += 1;
            setSurvivorState((prev) => {
              prev[survivorIndex].shelterCount += 1;
              return [...prev];
            });
            return false;
          }
          return true;
        });

        if (firstCheck) {
          if (
            survivorCountArray[survivorIndex].foodCount < 1 ||
            survivorCountArray[survivorIndex].shelterCount < 1
          ) {
            survivorStateArray[survivorIndex].remove();
            survivorStateArray[survivorIndex].removed = true;
            survivorCountArray[survivorIndex].eliminated = true;
          }
          // first check only needs to apply to one loop
          if (survivorIndex === survivorStateArray.length - 1) {
            firstCheck = false;
          }
        }
        if (secondCheck) {
          if (
            survivorCountArray[survivorIndex].foodCount < 1 ||
            survivorCountArray[survivorIndex].shelterCount < 1
          ) {
            survivorStateArray[survivorIndex].remove();
            survivorStateArray[survivorIndex].removed = true;
            survivorCountArray[survivorIndex].eliminated = true;
          }
          // second check only needs to apply to one loop
          if (survivorIndex === survivorStateArray.length - 1) {
            secondCheck = false;
          }
        }
        if (!survivorStateArray[survivorIndex].removed) {
          survivorStateArray[survivorIndex].update();
        }
      });
      if (
        foodStateLength > updatedFoodState.length ||
        shelterStateLength > updatedShelterState.length
      ) {
        foodStateLength = updatedFoodState.length;
        shelterStateLength = updatedShelterState.length;
        setFoodStateArray([...foodStateBoolArray]);
        setShelterStateArray([...shelterStateBoolArray]);
      }
    };
    window.requestAnimationFrame(animateNodes);
  }, [
    beginSimulation,
    canvasDimensions.buffer,
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    foodState,
    setFoodStateArray,
    setShelterStateArray,
    setSurvivorState,
    shelterState,
    survivorStateXY,
    totalTime,
  ]);

  return <canvas ref={canvasRef} id="dnaCanvas" />;
};
