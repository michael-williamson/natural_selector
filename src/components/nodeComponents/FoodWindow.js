import React, { useRef, useEffect } from "react";
import meatFood from "../../media/icons/meat_feed.png";

const icon = new Image();
icon.src = meatFood;

export const FoodWindow = (props) => {
  const { foodState } = props;
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

    foodState.forEach((item) => {
      contextRef.current.drawImage(icon, item.x, item.y, 40, 40);
    });
  }, [canvasDimensions.canvasHeight, canvasDimensions.canvasWidth, foodState]);

  useEffect(() => {
    foodStateArray.forEach((item, index) => {
      if (item) {
        contextRef.current.clearRect(
          foodState[index].x,
          foodState[index].y,
          40,
          40
        );
      }
    });
  }, [foodStateArray, foodState]);

  return <canvas ref={canvasRef} id="foodCanvas"></canvas>;
};
