import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { FoodWindow } from "./FoodWindow";
import { xyCoordinateGenerator, xyCoordinateObject } from "./helperFunctions";
import { SurvivorWindow } from "./SurvivorWindow";
import { ShelterWindow } from "./ShelterWindow";
import { desertBG, mountainsBG, rainForestBG } from "../../media";
import { WaterWindow } from "./WaterWindow";

//create component before render
const CanvasWrapper = styled("div")(({ theme, fixedHeight }) => {
  return {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: 500,
    },
    [theme.breakpoints.down("md")]: {
      height: 500,
    },
    [theme.breakpoints.up("lg")]: {
      height: fixedHeight,
    },
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
  const { mdScreen } = props;
  const { numberSurvivors, setNumberSurvivors } = props;
  const [allCanvasDetails, setAllCanvasDetails] = useState(null);
  const [foodStateArray, setFoodStateArray] = useState(null);
  const [waterStateArray, setWaterStateArray] = useState(null);
  const [shelterStateArray, setShelterStateArray] = useState(null);
  const [resourceQuantity] = useState(14);
  const { beginSimulation } = props;
  const { setSurvivorState } = props;

  const canvasContainer = useRef(null);

  const bgImageObject = {
    desert: desertBG,
    mountain: mountainsBG,
    rainForest: rainForestBG,
  };

  useEffect(() => {
    const currentDiv = canvasContainer.current;
    let cHeight = currentDiv.clientHeight;
    let cWidth = currentDiv.clientWidth;
    //central location to set buffer of canvas and image size so that images don't disappear off page
    const bufferFN = (cWidth) => {
      const bufferArray = [
        { cWidth: 500, iconDimensions: 20, buffer: 10 },
        { cWidth: 800, iconDimensions: 20, buffer: 10 },
        { cWidth: 1200, iconDimensions: 20, buffer: 10 },
      ];

      let resultArr = bufferArray.filter((item) => {
        if (cWidth < item.cWidth) {
          return item;
        }
        return item;
      });

      return resultArr[0];
    };

    const bufferObject = bufferFN(cWidth);

    let buffer = bufferObject.buffer;

    setAllCanvasDetails((prev) => {
      if (prev === null) return prev;
      const length = prev.survivorStateXY.length;
      const count = numberSurvivors.count;
      if (count < length) {
        prev.survivorStateXY.pop();
        return { ...prev };
      } else if (count > length) {
        prev.survivorStateXY.push(xyCoordinateObject(cWidth, cHeight, buffer));
        return { ...prev };
      }
      return { ...prev };
    });
  }, [numberSurvivors.count]);

  useEffect(() => {
    if (!infoBannerRef) return;
    if (!numberSurvivors.reset) return;
    const currentDiv = canvasContainer.current;
    let cHeight = currentDiv.clientHeight;
    let cWidth = currentDiv.clientWidth;
    // const currentInfoBanner = infoBannerRef.current;
    //dashboard will be fixed size for laptop plus screens
    // const offsetHeight = mdScreen
    //   ? 500
    //   : window.innerHeight - currentInfoBanner.clientHeight;
    // console.log(mdScreen, offsetHeight, cHeight, "offsetheight");
    let offsetWidth = window.innerWidth - cWidth;

    //central location to set buffer of canvas and image size so that images don't disappear off page
    const bufferFN = (cWidth) => {
      const bufferArray = [
        { cWidth: 500, iconDimensions: 40, buffer: 40 },
        { cWidth: 800, iconDimensions: 40, buffer: 40 },
        { cWidth: 1200, iconDimensions: 40, buffer: 40 },
      ];

      let resultArr = bufferArray.filter((item) => {
        if (cWidth < item.cWidth) {
          return item;
        }
        return item;
      });

      return resultArr[0];
    };

    const bufferObject = bufferFN(cWidth);

    let iconDimensions = bufferObject.iconDimensions;
    let buffer = bufferObject.buffer;

    setFoodStateArray(Array(resourceQuantity).fill(false));
    setWaterStateArray(Array(resourceQuantity).fill(false));
    setShelterStateArray(Array(resourceQuantity).fill(false));

    setAllCanvasDetails({
      canvasDimensions: {
        canvasX: offsetWidth,
        canvasHeight: cHeight,
        canvasWidth: cWidth,
        buffer: buffer,
        iconDimensions: iconDimensions,
      },
      shelterStateXY: xyCoordinateGenerator(
        resourceQuantity,
        cWidth,
        cHeight,
        buffer
      ),
      foodStateXY: xyCoordinateGenerator(
        resourceQuantity,
        cWidth,
        cHeight,
        buffer
      ),
      waterStateXY: xyCoordinateGenerator(
        resourceQuantity,
        cWidth,
        cHeight,
        buffer
      ),
      survivorStateXY: xyCoordinateGenerator(10, cWidth, cHeight, buffer),
    });
    setNumberSurvivors((prev) => {
      prev.reset = false;
      return { ...prev };
    });
  }, [
    infoBannerRef,
    beginSimulation.start,
    beginSimulation.finished,
    numberSurvivors.reset,
    setNumberSurvivors,
    resourceQuantity,
    mdScreen,
  ]);

  return (
    <CanvasWrapper
      className="canvasContainer"
      id="canvasContainer"
      ref={canvasContainer}
      fixedHeight={`${
        infoBannerRef.current
          ? window.innerHeight - infoBannerRef?.current.clientHeight
          : "500"
      }px`}
      style={{
        backgroundImage: `url(${bgImageObject[environmentsPath]})`,
      }}
    >
      {allCanvasDetails && (
        <div>
          <SurvivorWindow
            shelterStateXY={allCanvasDetails.shelterStateXY}
            foodStateXY={allCanvasDetails.foodStateXY}
            waterStateXY={allCanvasDetails.waterStateXY}
            survivorStateXY={allCanvasDetails.survivorStateXY}
            setFoodStateArray={setFoodStateArray}
            setWaterStateArray={setWaterStateArray}
            setShelterStateArray={setShelterStateArray}
            resourceQuantity={resourceQuantity}
            canvasDimensions={allCanvasDetails.canvasDimensions}
            beginSimulation={beginSimulation}
            setSurvivorState={setSurvivorState}
            timer={timer}
            numberSurvivors={numberSurvivors}
            setNumberSurvivors={setNumberSurvivors}
          />
          <FoodWindow
            foodStateXY={allCanvasDetails.foodStateXY}
            foodStateArray={foodStateArray}
            setFoodStateArray={setFoodStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
            environmentsPath={environmentsPath}
          />
          <WaterWindow
            waterStateXY={allCanvasDetails.waterStateXY}
            waterStateArray={waterStateArray}
            setWaterStateArray={setWaterStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
            environmentsPath={environmentsPath}
          />
          <ShelterWindow
            shelterStateXY={allCanvasDetails.shelterStateXY}
            shelterStateArray={shelterStateArray}
            setShelterStateArray={setShelterStateArray}
            canvasDimensions={allCanvasDetails.canvasDimensions}
            environmentsPath={environmentsPath}
          />
        </div>
      )}
    </CanvasWrapper>
  );
};
