import React from "react";
import { Box } from "@mui/system";
import { Survivors } from "./Survivors";

export const SurvivalScoreboard = () => {
  return (
    <Box bgcolor="primary.main" height="100%">
      <Box fontSize={40} fontWeight="bold" color="text.primary">
        Survival Scoreboard
      </Box>
      <Survivors />
    </Box>
  );
};
