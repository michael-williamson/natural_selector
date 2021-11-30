import React from "react";
import { Box } from "@mui/system";

export const IndividualSurvivor = (props) => {
  const { survivorNumber } = props;
  return (
    <Box p={2} bgcolor="info.main">
      <Box
        color="text.disabled"
        fontSize={30}
        fontWeight="bold"
      >{`Survivor #${survivorNumber}`}</Box>
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};
