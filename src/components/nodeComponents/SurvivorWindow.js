import React, { useRef, useEffect } from "react";
import dnaIcon from "../../media/icons/dna_helix.png";
import { getDistance } from "./helperFunctions";

const icon = new Image();
icon.src = dnaIcon;

export const SurvivorWindow = (props) => {
  const { shelterStateXY } = props;
  const { foodStateXY } = props;
  const { waterStateXY } = props;
  const { survivorStateXY } = props;
  const { setFoodStateArray } = props;
  const { setWaterStateArray } = props;
  const { setShelterStateArray } = props;
  const { canvasDimensions } = props;
  const { beginSimulation } = props;
  const { setSurvivorState } = props;
  const { timer } = props;
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    survivorStateArray.forEach((item) => item.draw());
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    survivorStateXY,
    survivorStateXY.length,
  ]);

  //this useEffect must only fire once per render, rather than using certain states replica modeled data is created
  useEffect(() => {
    if (!beginSimulation.start) return;
    let start;
    const context = contextRef.current;
    //for now padding to keep icons on page
    const buffer = canvasDimensions.buffer;
    const bufferedWidth = canvasDimensions.canvasWidth - buffer;
    const bufferedHeight = canvasDimensions.canvasHeight - buffer;
    const canvas = canvasRef.current;

    let countDown = timer;
    //periodic checks for stats
    let firstCheck = false;
    let secondCheck = false;

    //boolean logic gate for time interval checks
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

    function SurvivorCount(index) {
      this.foodCount = 0;
      this.waterCount = 0;
      this.shelterCount = 0;
      this.adaptation = 0;
      this.index = index;
    }

    function Survivor(x, y, dx, dy, index) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.removed = false;
      this.index = index;

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

    let survivorStateArray = [];
    const survivorCountArray = [];

    survivorStateXY.forEach((item, index) => {
      let maxVelocity = 2;
      const velocityArray = [0, maxVelocity];
      let vx = velocityArray[Math.floor(Math.random() * 2)];
      let vy =
        vx === maxVelocity
          ? velocityArray[Math.floor(Math.random() * 2)]
          : maxVelocity;
      survivorStateArray.push(new Survivor(item.x, item.y, vx, vy, index));
      survivorCountArray.push(new SurvivorCount(index));
    });

    //booleans for index positions of resource icons
    const foodStateBoolArray = Array(foodStateXY.length).fill(false);
    const waterStateBoolArray = Array(waterStateXY.length).fill(false);
    const shelterStateBoolArray = Array(shelterStateXY.length).fill(false);

    let foodStateArray = [...foodStateXY];
    let waterStateArray = [...waterStateXY];
    let shelterStateArray = [...shelterStateXY];

    let foodStateLength = foodStateXY.length;
    let waterStateLength = waterStateXY.length;
    let shelterStateLength = shelterStateXY.length;

    const animateNodes = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed < 0) return;
      let totalTimeMilliseconds = timer * 1000;
      if (elapsed < totalTimeMilliseconds) {
        window.requestAnimationFrame(animateNodes);
      }
      context.clearRect(0, 0, canvas.width, canvas.height);

      survivorStateArray.forEach((survivorItem, survivorIndex) => {
        foodStateArray = foodStateArray.filter((item, index) => {
          if (foodStateBoolArray[item.index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, survivorItem.x, survivorItem.y) < 50
          ) {
            foodStateBoolArray[item.index] = true;
            survivorCountArray[survivorItem.index].foodCount += 1;
            setSurvivorState((prev) => {
              prev[survivorItem.index].foodCount += 1;
              return [...prev];
            });
            return false;
          }
          return true;
        });
        waterStateArray = waterStateArray.filter((item, index) => {
          if (waterStateBoolArray[item.index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, survivorItem.x, survivorItem.y) < 50
          ) {
            waterStateBoolArray[item.index] = true;
            survivorCountArray[survivorItem.index].waterCount += 1;
            setSurvivorState((prev) => {
              prev[survivorItem.index].waterCount += 1;
              return [...prev];
            });
            return false;
          }
          return true;
        });

        shelterStateArray = shelterStateArray.filter((item, index) => {
          if (shelterStateBoolArray[item.index]) {
            return false;
          } else if (
            getDistance(item.x, item.y, survivorItem.x, survivorItem.y) < 50
          ) {
            shelterStateBoolArray[item.index] = true;
            survivorCountArray[survivorItem.index].shelterCount += 1;
            setSurvivorState((prev) => {
              prev[survivorItem.index].shelterCount += 1;
              return [...prev];
            });
            return false;
          }
          return true;
        });

        survivorItem.update();
      });

      if (firstCheck || secondCheck) {
        survivorStateArray = survivorStateArray.filter((item) => {
          if (
            survivorCountArray[item.index].foodCount < 1 ||
            survivorCountArray[item.index].waterCount < 1 ||
            survivorCountArray[item.index].shelterCount < 1
          ) {
            setSurvivorState((prev) => {
              prev[item.index].eliminated = true;
              return [...prev];
            });
            return false;
          } else {
            let count =
              survivorCountArray[item.index].foodCount +
              survivorCountArray[item.index].waterCount +
              survivorCountArray[item.index].shelterCount;
            if (firstCheck && count >= 3) {
              setSurvivorState((prev) => {
                prev[item.index].adaptation = 1;
                return [...prev];
              });
            } else if (secondCheck && count >= 6) {
              setSurvivorState((prev) => {
                prev[item.index].adaptation = 2;
                return [...prev];
              });
            }

            return true;
          }
        });
        // first and second check only needs to apply to one loop
        if (firstCheck) {
          firstCheck = false;
        } else if (secondCheck) {
          secondCheck = false;
        }
      }
      //shorter array indicates value was intercepted, update arrays after main loop complete
      foodStateLength > foodStateArray.length &&
        setFoodStateArray([...foodStateBoolArray]);
      waterStateLength > waterStateArray.length &&
        setWaterStateArray([...waterStateBoolArray]);
      shelterStateLength > shelterStateArray.length &&
        setShelterStateArray([...shelterStateBoolArray]);
      if (foodStateLength > foodStateArray.length) {
        foodStateLength = foodStateArray.length;
      }
      if (waterStateLength > waterStateArray.length) {
        waterStateLength = waterStateArray.length;
      }
      if (shelterStateLength > shelterStateArray.length) {
        shelterStateLength = shelterStateArray.length;
      }
    };
    window.requestAnimationFrame(animateNodes);
  }, [
    beginSimulation,
    canvasDimensions.buffer,
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    foodStateXY,
    waterStateXY,
    setFoodStateArray,
    setWaterStateArray,
    setShelterStateArray,
    setSurvivorState,
    shelterStateXY,
    survivorStateXY,
    timer,
  ]);

  return <canvas ref={canvasRef} id="dnaCanvas" />;
};
