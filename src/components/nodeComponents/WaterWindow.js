import React, { useRef, useEffect } from "react";

export const WaterWindow = (props) => {
  const { waterStateXY } = props;
  const { waterStateArray } = props;
  const { canvasDimensions } = props;
  const { environmentsPath } = props;
  const { environmentsIconsObject } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const icon = environmentsIconsObject[environmentsPath].water;

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

    waterStateXY.forEach((item) => {
      contextRef.current.drawImage(
        icon,
        item.x,
        item.y,
        iconDimensions,
        iconDimensions
      );
    });
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    waterStateXY,
    icon,
    canvasDimensions.iconDimensions,
  ]);

  useEffect(() => {
    waterStateArray.forEach((item, index) => {
      if (item) {
        contextRef.current.clearRect(
          waterStateXY[index].x,
          waterStateXY[index].y,
          canvasDimensions.iconDimensions,
          canvasDimensions.iconDimensions
        );
      }
    });
  }, [canvasDimensions.iconDimensions, waterStateArray, waterStateXY]);

  return <canvas ref={canvasRef} id="foodCanvas"></canvas>;
};
