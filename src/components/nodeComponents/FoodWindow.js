import React, { useRef, useEffect } from "react";
import meatFood from "../../media/icons/meat_feed.png";

const icon = new Image();
icon.src = meatFood;

export const FoodWindow = (props) => {
  const { foodStateXY } = props;
  const { foodStateArray } = props;
  const { canvasDimensions } = props;
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

    context.clearRect(0, 0, canvas.width, canvas.height);

    foodStateXY.forEach((item) => {
      contextRef.current.drawImage(icon, item.x, item.y, 40, 40);
    });
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    foodStateXY,
  ]);

  useEffect(() => {
    foodStateArray.forEach((item, index) => {
      if (item) {
        contextRef.current.clearRect(
          foodStateXY[index].x,
          foodStateXY[index].y,
          40,
          40
        );
      }
    });
  }, [foodStateArray, foodStateXY]);

  return <canvas ref={canvasRef} id="foodCanvas"></canvas>;
};
