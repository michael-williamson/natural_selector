import React, { useRef, useEffect } from "react";
import dnaIcon from "../../media/icons/dna_helix.png";
import { layoutObject } from "./helperFunctions";

export const NodeWindow = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    console.log("use effect running");
    const canvas = canvasRef.current;
    let canvasWidth = window.innerWidth - 350;
    let canvasHeight = window.innerHeight - 350;
    const numNodes = 20;
    canvas.width = window.innerWidth - 300;
    canvas.height = window.innerHeight - 300;
    canvas.style.overflow = "hidden";
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");
    contextRef.current = context;
    const nodeDimensionsObject = layoutObject(canvasHeight, canvasWidth, 20);
    const icon = new Image();
    icon.src = dnaIcon;
    let drawPending = false;
    function Node(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;

      this.draw = function () {
        context.drawImage(icon, this.x, this.y);

        // context.beginPath();
        // context.arc(this.x, this.y, 40, 0, Math.PI * 2, false);
        // context.closePath();
        // context.strokeStyle = "blue";
        // context.stroke();
        // context.fill();
      };
      this.update = function () {
        if (this.x > canvasWidth || this.x < 50) {
          this.dx = -this.dx;
        }
        if (this.y > canvasHeight || this.y < 50) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      };
    }

    let counter = 0;
    let dyIntervals = Math.floor(
      canvasHeight / nodeDimensionsObject.nodesPerColumn
    );
    let dxIntervals = Math.floor(
      canvasWidth / nodeDimensionsObject.numberOfColumns
    );
    let topOffset = false;
    let firstColumn = true;
    let dx = 50;
    let dy = dyIntervals / 2;
    const nodeArray = [];
    for (let i = 0; i < numNodes; i++) {
      if (firstColumn && counter === 0) {
        counter += 1;
        firstColumn = false;
      } else {
        counter += 1;
        dy += dyIntervals;
      }
      if (counter > nodeDimensionsObject.nodesPerColumn) {
        if (topOffset) {
          dy = dyIntervals / 2;
          dx += dxIntervals;
        } else {
          dy = 50;
          dx += dxIntervals;
        }
        counter = 1;
        topOffset = !topOffset;
      }
      nodeArray.push(new Node(dx, dy, 2, 2));
    }
    let start;
    const animateNodes = (timestamp) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      if (elapsed < 20000 && drawPending === false) {
        drawPending = true;
        // Stop the animation after 20 seconds
        window.requestAnimationFrame(animateNodes);
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nodeArray.length; i++) {
        nodeArray[i].update();
      }
      drawPending = false;
    };
    window.requestAnimationFrame(animateNodes);
  }, []);
  return <canvas ref={canvasRef} className="dnaCanvas" />;
};
