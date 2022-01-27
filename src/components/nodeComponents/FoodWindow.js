import React, { useRef, useEffect } from "react";
import { environmentIconObject } from "../../helperFunctions";

export const FoodWindow = (props) => {
  const { foodStateXY } = props;
  const { foodStateArray } = props;
  const { canvasDimensions } = props;
  const { environmentsPath } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let canvasWidth = canvasDimensions.canvasWidth;
    let canvasHeight = canvasDimensions.canvasHeight;
    let iconDimensions = canvasDimensions.iconDimensions;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.overflow = "hidden";
    const context = canvas.getContext("2d");
    contextRef.current = context;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();

    foodStateXY.forEach((item) => {
      image.addEventListener("load", (e) => {
        contextRef.current.drawImage(
          image,
          item.x,
          item.y,
          iconDimensions,
          iconDimensions
        );
      });
    });

    image.src = environmentIconObject[environmentsPath].food;
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    canvasDimensions.iconDimensions,

    environmentsPath,
    foodStateXY,
  ]);

  useEffect(() => {
    foodStateArray.forEach((item, index) => {
      if (item) {
        contextRef.current.clearRect(
          foodStateXY[index].x,
          foodStateXY[index].y,
          canvasDimensions.iconDimensions,
          canvasDimensions.iconDimensions
        );
      }
    });
  }, [canvasDimensions.iconDimensions, foodStateArray, foodStateXY]);

  return <canvas ref={canvasRef} id="foodCanvas"></canvas>;
};
