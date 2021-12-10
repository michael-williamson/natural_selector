import React, { useRef, useEffect } from "react";
import caveShelter from "../../media/icons/cave_shelter.png";

const icon = new Image();
icon.src = caveShelter;

export const ShelterWindow = (props) => {
  const { shelterStateXY } = props;
  const { shelterStateArray } = props;
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

    shelterStateXY.forEach((item) => {
      contextRef.current.drawImage(icon, item.x, item.y, 40, 40);
    });
  }, [
    canvasDimensions.canvasHeight,
    canvasDimensions.canvasWidth,
    shelterStateXY,
  ]);

  useEffect(() => {
    shelterStateArray.forEach((item, index) => {
      if (item) {
        contextRef.current.clearRect(
          shelterStateXY[index].x,
          shelterStateXY[index].y,
          40,
          40
        );
      }
    });
  }, [shelterStateArray, shelterStateXY]);
  return <canvas ref={canvasRef} id="shelterCanvas"></canvas>;
};
