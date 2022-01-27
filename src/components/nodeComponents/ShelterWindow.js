import React, { useRef, useEffect } from "react";
import { environmentIconObject } from "../../helperFunctions";

export const ShelterWindow = (props) => {
  const { shelterStateXY } = props;
  const { shelterStateArray } = props;
  const { canvasDimensions } = props;
  const { environmentsPath } = props;
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    if (!canvasRef) return;
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

    shelterStateXY.forEach((item) => {
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

    image.src = environmentIconObject[environmentsPath].shelter;
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    shelterStateXY,
    canvasDimensions.iconDimensions,
    canvasRef,
    environmentsPath,
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
