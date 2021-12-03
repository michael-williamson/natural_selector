import React, { useRef, useEffect, useState } from "react";
import caveShelter from "../../media/icons/cave_shelter.png";

export const ShelterCanvas = (props) => {
  const { shelterState } = props;
  const { shelterStateArray } = props;
  const { canvasDimensions } = props;
  const [nodeObject, setNodeObject] = useState(null);
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

    const icon = new Image();
    icon.src = caveShelter;

    function Node(x, y) {
      this.x = x;
      this.y = y;

      this.draw = function () {
        context.drawImage(icon, this.x, this.y, 40, 40);
      };
      this.update = function () {
        context.clearRect(this.x, this.y, 40, 40);
      };
    }

    const nodeArray = [];
    shelterState.forEach((item) => {
      nodeArray.push(new Node(item.x, item.y));
    });
    nodeArray.forEach((item) => item.draw());
    setNodeObject(nodeArray);
  }, [
    shelterState,
    canvasDimensions.canvasWidth,
    canvasDimensions.canvasHeight,
  ]);

  useEffect(() => {
    shelterStateArray &&
      nodeObject &&
      shelterStateArray.forEach((item, index) => {
        if (item) {
          nodeObject[index].update();
        }
      });
  }, [shelterStateArray, nodeObject]);
  return <canvas ref={canvasRef} id="shelterCanvas"></canvas>;
};
