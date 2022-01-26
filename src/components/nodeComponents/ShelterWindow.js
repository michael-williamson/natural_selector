import React, { useRef, useEffect } from "react";

export const ShelterWindow = (props) => {
  const { shelterStateXY } = props;
  const { shelterStateArray } = props;
  const { canvasDimensions } = props;
  const { environmentsPath } = props;
  const { environmentsIconsObject } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const icon = environmentsIconsObject[environmentsPath].shelter;

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

    shelterStateXY.forEach((item) => {
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
    shelterStateXY,
    icon,
    canvasDimensions.iconDimensions,
  ]);

  useEffect(() => {
    shelterStateArray.forEach((item, index) => {
      if (item) {
        contextRef.current.clearRect(
          shelterStateXY[index].x,
          shelterStateXY[index].y,
          canvasDimensions.iconDimensions,
          canvasDimensions.iconDimensions
        );
      }
    });
  }, [canvasDimensions.iconDimensions, shelterStateArray, shelterStateXY]);
  return <canvas ref={canvasRef} id="shelterCanvas"></canvas>;
};
