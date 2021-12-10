import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Survivors } from "./Survivors";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { HelpDialogComponent } from "../reusableComponents/HelpDialogComponent";
import { SliderSelectorComponent } from "../reusableComponents/SliderSelectorComponent";

export const SurvivalScoreboard = (props) => {
  const { handleClickSimulation } = props;
  const { beginSimulation } = props;
  const { handleClickNumSurvivors } = props;
  const { numberSurvivors } = props;
  const { survivorState } = props;
  const { timer, setTimer, setTotalTime, setTimerFinished } = props;
  const [countDown, setCountDown] = useState(30);
  useEffect(() => {
    if (!beginSimulation) return;
    const clearCountDown = setInterval(countDownFN, 1000);
    function countDownFN() {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(clearCountDown);
          return timer;
        }
        return (prev -= 1);
      });
    }
  }, [setCountDown, timer, beginSimulation, setTimerFinished]);
  return (
    <Box bgcolor="primary.main">
      <Box fontSize={40} fontWeight="bold" color="primary.light">
        Survival Scoreboard
      </Box>
      <Box py={2}>
        <Button
          variant="contained"
          onClick={handleClickSimulation}
          color="success"
        >
          <Box fontWeight="bold">Begin Simulation</Box>
        </Button>
      </Box>
      <Box py={4}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box py={2} fontSize={20} fontWeight="bold" color="primary.light">
            Number of Survivors:
          </Box>
          <Box pl={2}>
            <HelpDialogComponent
              Icon={HelpOutlineOutlinedIcon}
              messageText="Maximum amount is 10"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around">
          <Button
            onClick={handleClickNumSurvivors(1)}
            variant="contained"
            color="success"
          >
            <Box fontWeight="bold">+</Box>
          </Button>
          <Box fontSize={30} fontWeight="bold" color="primary.light">
            {numberSurvivors}
          </Box>
          <Button
            onClick={handleClickNumSurvivors(0)}
            variant="contained"
            color="success"
          >
            <Box fontWeight="bold">-</Box>
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" py={2} alignItems="center">
        <Box fontSize={20} fontWeight="bold" color="primary.light">
          Timer:
        </Box>
        <Box fontSize={30} fontWeight="bold" color="primary.light" px={2}>
          {countDown}
        </Box>
        <Box fontSize={20} fontWeight="bold" color="primary.light">
          seconds
        </Box>
      </Box>
      <Box>
        <SliderSelectorComponent
          setState={setTimer}
          setTotalTime={setTotalTime}
          state={timer}
        />
      </Box>
      <Box maxHeight={500} overflow="scroll">
        <Survivors survivorState={survivorState} />
      </Box>
    </Box>
  );
};
