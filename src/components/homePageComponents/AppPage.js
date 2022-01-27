import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { InfoBanner } from "../infoBannerComponents/InfoBanner";
import { CanvasContainer } from "../nodeComponents/CanvasContainer";
import { SurvivalScoreboard } from "../survivalScoreboardComponents/SurvivalScoreboard";
import { survivorStateFN } from "../../helperFunctions";
import { environmentIconObject } from "../../helperFunctions";

export const AppPage = (props) => {
  const { environmentsPath, setEnvironmentsPath } = props;
  const theme = useTheme();
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  //default is 30 seconds for timer
  const [timer, setTimer] = useState(30);
  const [reset, setReset] = useState(false);
  const [beginSimulation, setBeginSimulation] = useState({
    start: false,
    finished: false,
  });
  //default number of survivors is 10
  const [numberSurvivors, setNumberSurvivors] = useState({
    count: 10,
    max: 10,
    reset: true,
    firstElimination: false,
    secondElimination: false,
  });
  const [survivorState, setSurvivorState] = useState(survivorStateFN(10));

  const infoBannerRef = useRef(null);

  useEffect(() => {
    if (!reset) return;
    setTimer(30);
    setNumberSurvivors({
      count: 10,
      max: 10,
      reset: true,
      firstElimination: false,
      secondElimination: false,
    });

    setSurvivorState(survivorStateFN(10));
    setReset(false);
  }, [reset]);

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
  };

  const handleResetSimulation = () => {
    setBeginSimulation({
      start: false,
      finished: false,
    });
    setReset(true);
  };

  return (
    <Box sx={{ height: { lg: "100vh" }, width: "100%" }}>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <SurvivalScoreboard
            handleSimulation={handleSimulation}
            handleResetSimulation={handleResetSimulation}
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
            setNumberSurvivors={setNumberSurvivors}
            setSurvivorState={setSurvivorState}
            environmentsPath={environmentsPath}
            infoBannerRef={infoBannerRef}
            timer={timer}
            mdScreen={mdScreen}
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
