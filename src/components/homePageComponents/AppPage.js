import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { InfoBanner } from "../infoBannerComponents/InfoBanner";
import { CanvasContainer } from "../nodeComponents/CanvasContainer";
import { SurvivalScoreboard } from "../survivalScoreboardComponents/SurvivalScoreboard";
import { survivorStateFN } from "../../helperFunctions";
import { environmentIconObject } from "../../helperFunctions";

export const AppPage = (props) => {
  const { environmentsPath, setEnvironmentsPath } = props;
  //default is 30 seconds for timer
  const [timer, setTimer] = useState(30);
  const [beginSimulation, setBeginSimulation] = useState({
    start: false,
    finished: false,
  });
  //default number of survivors is 10
  const [numberSurvivors, setNumberSurvivors] = useState({
    count: 10,
    max: 10,
  });
  const [survivorState, setSurvivorState] = useState(survivorStateFN(10));

  const infoBannerRef = useRef(null);

  const handleClickNumSurvivors = (input) => (event) => {
    if (input && numberSurvivors.count === numberSurvivors.max) return;
    if (!input && numberSurvivors.count === 0) return;

    setNumberSurvivors((prev) => {
      if (input) {
        let currentNum = prev.count + 1;
        prev.count = prev.count >= 9 ? 10 : currentNum;
        return { ...prev };
      } else {
        let currentNum = prev.count - 1;
        prev.count = prev.count <= 0 ? 1 : currentNum;
        return { ...prev };
      }
    });

    input
      ? setSurvivorState((prev) => {
          const update = [...prev];
          // push survivor object from helperFunctions file
          update.push({
            foodCount: 0,
            waterCount: 0,
            shelterCount: 0,
            adaptation: 0,
            eliminated: false,
          });
          return update;
        })
      : setSurvivorState((prev) => {
          const update = [...prev];
          update.pop();
          return update;
        });
  };

  const handleSimulation = (start, finished) => () => {
    setBeginSimulation((prev) => {
      prev.start = start;
      prev.finished = finished;
      return { ...prev };
    });

    !start &&
      !finished &&
      setSurvivorState(survivorStateFN(numberSurvivors.count));
  };

  return (
    <Box sx={{ height: { lg: "100vh" }, width: "100%" }}>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <SurvivalScoreboard
            handleSimulation={handleSimulation}
            beginSimulation={beginSimulation}
            setBeginSimulation={setBeginSimulation}
            handleClickNumSurvivors={handleClickNumSurvivors}
            setTimer={setTimer}
            timer={timer}
            survivorState={survivorState}
            numberSurvivors={numberSurvivors}
            environmentsPath={environmentsPath}
            setEnvironmentsPath={setEnvironmentsPath}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <CanvasContainer
            beginSimulation={beginSimulation}
            numberSurvivors={numberSurvivors}
            setSurvivorState={setSurvivorState}
            environmentsPath={environmentsPath}
            infoBannerRef={infoBannerRef}
            timer={timer}
          />
          <InfoBanner
            beginSimulation={beginSimulation}
            survivorState={survivorState}
            infoBannerRef={infoBannerRef}
            environmentIconObject={environmentIconObject[environmentsPath]}
            environmentsPath={environmentsPath}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
