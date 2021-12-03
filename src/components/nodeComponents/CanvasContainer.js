import React, { useState, useEffect, useRef } from "react";
import { FoodWindow } from "./FoodWindow";
import { xyCoordinateGenerator } from "./helperFunctions";
import { NodeWindow } from "./NodeWindow";
import { ShelterCanvas } from "./ShelterCanvas";

export const CanvasContainer = (props) => {
  const [allCanvasDetails, setAllCanvasDetails] = useState(null);
  const [foodStateArray, setFoodStateArray] = useState(Array(7).fill(false));
  const [shelterStateArray, setShelterStateArray] = useState(
    Array(7).fill(false)
  );
  const { totalTime } = props;
  const { beginSimulation } = props;
  const { numberSurvivors } = props;
  const { setSurvivorState } = props;
  const { survivorState } = props;

  const canvasContainer = useRef(null);

  useEffect(() => {
    const currentDiv = canvasContainer.current;
    let cHeight = currentDiv.clientHeight;
    let cWidth = currentDiv.clientWidth;
    // let offsetHeight = window.innerHeight - cHeight;
    let offsetWidth = window.innerWidth - cWidth;

    setAllCanvasDetails({
      canvasDimensions: {
        canvasX: offsetWidth,
        canvasHeight: 800,
        // canvasHeight: cHeight,
        canvasWidth: cWidth,
      },
      shelterStateXY: xyCoordinateGenerator(7, cWidth - 50, cHeight - 50),
      foodStateXY: xyCoordinateGenerator(7, cWidth - 50, cHeight - 50),
    });
  }, []);

  return (
    <div className="canvasContainer" id="canvasContainer" ref={canvasContainer}>
      {allCanvasDetails && (
        <div>
          <NodeWindow
            shelterState={allCanvasDetails.shelterStateXY}
            setAllCanvasDetails={setAllCanvasDetails}
            foodState={allCanvasDetails.foodStateXY}
            foodStateArray={foodStateArray}
            setFoodStateArray={setFoodStateArray}
            shelterStateArray={shelterStateArray}
            setShelterStateArray={setShelterStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
            totalTime={totalTime}
            beginSimulation={beginSimulation}
            numberSurvivors={numberSurvivors}
            setSurvivorState={setSurvivorState}
            survivorState={survivorState}
          />
          <FoodWindow
            setAllCanvasDetails={setAllCanvasDetails}
            foodState={allCanvasDetails.foodStateXY}
            foodStateArray={foodStateArray}
            setFoodStateArray={setFoodStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
          />
          <ShelterCanvas
            shelterState={allCanvasDetails.shelterStateXY}
            setAllCanvasDetails={setAllCanvasDetails}
            shelterStateArray={shelterStateArray}
            setShelterStateArray={setShelterStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
          />
        </div>
      )}
    </div>
  );
};
