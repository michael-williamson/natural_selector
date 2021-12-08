import React from "react";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { InfoBanner } from "../infoBannerComponents/InfoBanner";
import { CanvasContainer } from "../nodeComponents/CanvasContainer";
import { SurvivalScoreboard } from "../survivalScoreboardComponents/SurvivalScoreboard";
import { survivorStateFN } from "../../helperFunctions";

export const AppPage = (props) => {
  const { environmentsPath } = props;
  const [timer, setTimer] = useState(30);
  const [totalTime, setTotalTime] = useState(null);
  const [beginSimulation, setBeginSimulation] = useState(false);
  const [numberSurvivors, setNumberSurvivors] = useState(10);
  const [survivorState, setSurvivorState] = useState(survivorStateFN(10));
  const [timerFinished, setTimerFinished] = useState(false);

  useEffect(() => {
    setTotalTime(timer);
  }, [timer]);

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
    let endTimer = setInterval(countDownFN, 1000);
    function countDownFN() {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(endTimer);
          setBeginSimulation(false);
          setTimerFinished(true);
          return 30;
        }
        return prev - 1;
      });
    }
  };
  return (
    <Grid container>
      <Grid item xs={2}>
        <SurvivalScoreboard
          handleClickSimulation={handleClickSimulation}
          handleClickNumSurvivors={handleClickNumSurvivors}
          setTimer={setTimer}
          timer={timer}
          numberSurvivors={numberSurvivors}
          survivorState={survivorState}
        />
      </Grid>
      <Grid item xs={10}>
        <CanvasContainer
          totalTime={totalTime}
          beginSimulation={beginSimulation}
          numberSurvivors={numberSurvivors}
          survivorState={survivorState}
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
