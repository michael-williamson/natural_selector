import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Survivors } from "./Survivors";

export const SurvivalScoreboard = (props) => {
  const { handleClickSimulation } = props;
  const { handleClickNumSurvivors } = props;
  const { numberSurvivors } = props;
  const { survivorState } = props;
  const { timer } = props;
  return (
    <Box bgcolor="primary.main" height="100%">
      <Box fontSize={40} fontWeight="bold" color="primary.light">
        Survival Scoreboard
      </Box>
      <Box py={2}>
        <Button
          variant="contained"
          onClick={handleClickSimulation}
          color="success"
        >
          Begin Simulation
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-around" py={4}>
        <Button
          onClick={handleClickNumSurvivors(1)}
          variant="contained"
          color="success"
        >
          +
        </Button>
        <Box fontSize={30} color="primary.light">
          {numberSurvivors}
        </Box>
        <Button
          onClick={handleClickNumSurvivors(0)}
          variant="contained"
          color="success"
        >
          -
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" py={2}>
        <Box fontSize={40} fontWeight="bold" color="primary.light">
          Timer:
        </Box>
        <Box fontSize={40} fontWeight="bold" color="primary.light" px={2}>
          {timer || 15}
        </Box>
        <Box fontSize={20} fontWeight="bold" color="primary.light" py={2}>
          seconds
        </Box>
      </Box>
      <Box>
        <Survivors survivorState={survivorState} />
      </Box>
    </Box>
  );
};
