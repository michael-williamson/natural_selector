import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { FoodWindow } from "./FoodWindow";
import { xyCoordinateGenerator } from "./helperFunctions";
import { SurvivorWindow } from "./SurvivorWindow";
import { ShelterWindow } from "./ShelterWindow";
import { desertBG, mountainsBG, underwaterBG } from "../../media";

//create component before render
const CanvasWrapper = styled("div")(() => {
  return {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    height: "800px",
    width: "100%",
    "&::after": {
      position: "absolute",
      inset: 0,
      backgroundColor: "#2cec8eb8",
      content: "''",
      filter: "opacity(0.3)",
    },
  };
});

export const CanvasContainer = (props) => {
  const { environmentsPath } = props;
  const { timer } = props;
  const [allCanvasDetails, setAllCanvasDetails] = useState(null);
  const [foodStateArray, setFoodStateArray] = useState(Array(7).fill(false));
  const [shelterStateArray, setShelterStateArray] = useState(
    Array(7).fill(false)
  );
  const { beginSimulation } = props;
  const { setSurvivorState } = props;

  const canvasContainer = useRef(null);

  const bgImageObject = {
    desert: desertBG,
    mountain: mountainsBG,
    water: underwaterBG,
  };

  useEffect(() => {
    const currentDiv = canvasContainer.current;
    let cHeight = currentDiv.clientHeight;
    let cWidth = currentDiv.clientWidth;
    // let offsetHeight = window.innerHeight - cHeight;
    let offsetWidth = window.innerWidth - cWidth;
    offsetWidth = offsetWidth - 20;
    setAllCanvasDetails({
      canvasDimensions: {
        canvasX: offsetWidth,
        canvasHeight: 800,
        // canvasHeight: cHeight,
        canvasWidth: cWidth,
        buffer: 60,
      },
      shelterStateXY: xyCoordinateGenerator(7, cWidth - 50, cHeight - 50),
      foodStateXY: xyCoordinateGenerator(7, cWidth - 50, cHeight - 50),
      survivorStateXY: xyCoordinateGenerator(10, cWidth, cHeight, 60),
    });
  }, []);

  return (
    <CanvasWrapper
      className="canvasContainer"
      id="canvasContainer"
      ref={canvasContainer}
      style={{ backgroundImage: `url(${bgImageObject[environmentsPath]})` }}
    >
      {allCanvasDetails && (
        <div>
          <SurvivorWindow
            shelterStateXY={allCanvasDetails.shelterStateXY}
            foodStateXY={allCanvasDetails.foodStateXY}
            survivorStateXY={allCanvasDetails.survivorStateXY}
            setFoodStateArray={setFoodStateArray}
            setShelterStateArray={setShelterStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
            beginSimulation={beginSimulation}
            setSurvivorState={setSurvivorState}
            timer={timer}
          />
          <FoodWindow
            foodStateXY={allCanvasDetails.foodStateXY}
            foodStateArray={foodStateArray}
            setFoodStateArray={setFoodStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
          />
          <ShelterWindow
            shelterStateXY={allCanvasDetails.shelterStateXY}
            shelterStateArray={shelterStateArray}
            setShelterStateArray={setShelterStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
          />
        </div>
      )}
    </CanvasWrapper>
  );
};
