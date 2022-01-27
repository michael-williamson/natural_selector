import React, { useRef, useEffect } from "react";
import { environmentIconObject } from "../../helperFunctions";

export const WaterWindow = (props) => {
  const { waterStateXY } = props;
  const { waterStateArray } = props;
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

    waterStateXY.forEach((item) => {
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

    image.src = environmentIconObject[environmentsPath].water;
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    waterStateXY,
    canvasDimensions.iconDimensions,
    environmentsPath,
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

  return <canvas ref={canvasRef} id="waterCanvas"></canvas>;
};
