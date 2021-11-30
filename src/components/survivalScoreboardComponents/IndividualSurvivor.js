import React from "react";
import { Box } from "@mui/system";
import fur from "../../media/icons/fur.png";
import meatFood from "../../media/icons/meat_feed.png";
import caveShelter from "../../media/icons/cave_shelter.png";
import { theme } from "../../Theme";

export const IndividualSurvivor = (props) => {
  const { survivorNumber } = props;
  return (
    <Box p={2} bgcolor="info.main">
      <Box
        color={theme.palette.primary.light}
        fontSize={30}
        fontWeight="bold"
      >{`Survivor #${survivorNumber}`}</Box>
      <Box>
        <img src={fur} alt="fur" />
      </Box>
      <Box>
        <img src={meatFood} alt="meat" />
      </Box>
      <Box>
        <img src={caveShelter} alt="cave" />
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};
