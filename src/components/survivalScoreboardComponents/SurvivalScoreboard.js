import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Survivors } from "./Survivors";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { HelpDialogComponent } from "../reusableComponents/HelpDialogComponent";
import { SliderSelectorComponent } from "../reusableComponents/SliderSelectorComponent";

export const SurvivalScoreboard = (props) => {
  const { handleSimulation } = props;
  const { beginSimulation } = props;
  const { setBeginSimulation } = props;
  const { handleClickNumSurvivors } = props;
  const { numberSurvivors } = props;
  const { survivorState } = props;
  const { timer, setTimer } = props;
  const [countDown, setCountDown] = useState(30);
  const [countDownFinished, setCountDownFinished] = useState(false);

  useEffect(() => {
    if (!beginSimulation.start) return;
    const clearCountDown = setInterval(countDownFN, 1000);
    function countDownFN() {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(clearCountDown);
          setCountDownFinished(true);
          return timer;
        }
        return (prev -= 1);
      });
    }
  }, [setCountDown, timer, beginSimulation]);

  useEffect(() => {
    countDownFinished &&
      setBeginSimulation((prev) => {
        prev.start = false;
        prev.finished = true;
        return { ...prev };
      });
  }, [countDownFinished, setBeginSimulation]);

  useEffect(() => {
    beginSimulation.finished && setCountDownFinished(false);
  }, [beginSimulation.finished]);

  return (
    <Box bgcolor="primary.main">
      <Box fontSize={40} fontWeight="bold" color="primary.light">
        Survival Scoreboard
      </Box>
      <Box py={2}>
        <Button
          variant="contained"
          onClick={handleSimulation(true, false)}
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
            {numberSurvivors.count}
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
        <SliderSelectorComponent setState={setTimer} state={timer} />
      </Box>
      <Box maxHeight={500} overflow="scroll">
        <Survivors survivorState={survivorState} />
      </Box>
    </Box>
  );
};
