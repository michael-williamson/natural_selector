import React from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import { InfoBanner } from "../infoBannerComponents/InfoBanner";
import { CanvasContainer } from "../nodeComponents/CanvasContainer";
import { SurvivalScoreboard } from "../survivalScoreboardComponents/SurvivalScoreboard";
import { survivorStateFN } from "../../helperFunctions";

export const AppPage = (props) => {
  const { environmentsPath } = props;
  const [timer, setTimer] = useState(30);
  const [totalTime, setTotalTime] = useState(30);
  const [beginSimulation, setBeginSimulation] = useState(false);
  const [numberSurvivors, setNumberSurvivors] = useState(10);
  const [survivorState, setSurvivorState] = useState(survivorStateFN(10));
  const [timerFinished, setTimerFinished] = useState(false);

  const handleClickNumSurvivors = (input) => (event) => {
    setNumberSurvivors((prev) => {
      if (input) {
        let currentNum = prev + 1;
        currentNum < 10 &&
          setSurvivorState((prev) => {
            prev.push({
              foodCount: 0,
              shelterCount: 0,
              furCount: 0,
              eliminated: false,
            });
            return [...prev];
          });
        return currentNum >= 9 ? 10 : currentNum;
      } else {
        let currentNum = prev - 1;
        currentNum > 0 &&
          setSurvivorState((prev) => {
            prev.pop();
            return [...prev];
          });
        return currentNum <= 0 ? 1 : currentNum;
      }
    });
  };

  const handleClickSimulation = () => {
    setBeginSimulation(true);
  };
  return (
    <Grid container>
      <Grid item xs={2}>
        <SurvivalScoreboard
          handleClickSimulation={handleClickSimulation}
          beginSimulation={beginSimulation}
          handleClickNumSurvivors={handleClickNumSurvivors}
          setTimer={setTimer}
          setTotalTime={setTotalTime}
          timer={timer}
          setTimerFinished={setTimerFinished}
          numberSurvivors={numberSurvivors}
          survivorState={survivorState}
        />
      </Grid>
      <Grid item xs={10}>
        <CanvasContainer
          totalTime={totalTime}
          beginSimulation={beginSimulation}
          numberSurvivors={numberSurvivors}
          setSurvivorState={setSurvivorState}
          environmentsPath={environmentsPath}
        />
        <InfoBanner
          timerFinished={timerFinished}
          survivorState={survivorState}
        />
      </Grid>
    </Grid>
  );
};
