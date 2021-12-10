import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import { InfoBanner } from "../infoBannerComponents/InfoBanner";
import { CanvasContainer } from "../nodeComponents/CanvasContainer";
import { SurvivalScoreboard } from "../survivalScoreboardComponents/SurvivalScoreboard";
import { survivorStateFN } from "../../helperFunctions";

export const AppPage = (props) => {
  const { environmentsPath } = props;
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
    setNumberSurvivors((prev) => {
      if (input) {
        let currentNum = prev.count + 1;
        currentNum < prev.max &&
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

  const handleSimulation = (start, finished) => () => {
    console.log("running sim");
    setBeginSimulation((prev) => {
      prev.start = start;
      prev.finished = finished;
      return { ...prev };
    });
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <SurvivalScoreboard
          handleSimulation={handleSimulation}
          beginSimulation={beginSimulation}
          setBeginSimulation={setBeginSimulation}
          handleClickNumSurvivors={handleClickNumSurvivors}
          setTimer={setTimer}
          timer={timer}
          survivorState={survivorState}
          numberSurvivors={numberSurvivors}
        />
      </Grid>
      <Grid item xs={10}>
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
        />
      </Grid>
    </Grid>
  );
};
