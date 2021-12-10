import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { FoodWindow } from "./FoodWindow";
import { xyCoordinateGenerator, xyCoordinateObject } from "./helperFunctions";
import { SurvivorWindow } from "./SurvivorWindow";
import { ShelterWindow } from "./ShelterWindow";
import { desertBG, mountainsBG, underwaterBG } from "../../media";

//create component before render
const CanvasWrapper = styled("div")(() => {
  return {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
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
  const { infoBannerRef } = props;
  const { numberSurvivors } = props;
  const [allCanvasDetails, setAllCanvasDetails] = useState(null);
  const [foodStateArray, setFoodStateArray] = useState(null);
  const [shelterStateArray, setShelterStateArray] = useState(null);
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

    setAllCanvasDetails((prev) => {
      console.log(prev, "what is canvas details");
      if (prev === null) return prev;
      const length = prev.survivorStateXY.length;
      const count = numberSurvivors.count;
      if (count < length) {
        prev.survivorStateXY.pop();
        return { ...prev };
      } else if (count > length) {
        prev.survivorStateXY.push(xyCoordinateObject(cWidth, cHeight, 60));
        return { ...prev };
      }
      return { ...prev };
    });
  }, [numberSurvivors.count]);

  useEffect(() => {
    if (!infoBannerRef) return;
    if (beginSimulation.start || beginSimulation.finished) return;
    const currentDiv = canvasContainer.current;
    let cHeight = currentDiv.clientHeight;
    let cWidth = currentDiv.clientWidth;
    const currentInfoBanner = infoBannerRef.current;
    const offsetHeight = window.innerHeight - currentInfoBanner.clientHeight;
    let offsetWidth = window.innerWidth - cWidth;
    offsetWidth = offsetWidth - 20;

    setFoodStateArray(Array(7).fill(false));
    setShelterStateArray(Array(7).fill(false));

    setAllCanvasDetails({
      canvasDimensions: {
        canvasX: offsetWidth,
        canvasHeight: offsetHeight,
        canvasWidth: cWidth,
        buffer: 60,
      },
      shelterStateXY: xyCoordinateGenerator(7, cWidth - 50, cHeight - 50),
      foodStateXY: xyCoordinateGenerator(7, cWidth - 50, cHeight - 50),
      survivorStateXY: xyCoordinateGenerator(10, cWidth, cHeight, 60),
    });
  }, [infoBannerRef, beginSimulation.start, beginSimulation.finished]);

  return (
    <CanvasWrapper
      className="canvasContainer"
      id="canvasContainer"
      ref={canvasContainer}
      style={{
        backgroundImage: `url(${bgImageObject[environmentsPath]})`,
        height: `${
          infoBannerRef.current
            ? window.innerHeight - infoBannerRef?.current.clientHeight
            : "500"
        }px`,
      }}
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
