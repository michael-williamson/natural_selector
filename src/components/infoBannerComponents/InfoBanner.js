import React from "react";
import { Box } from "@mui/system";
import { theme } from "../../Theme";
import fur from "../../media/icons/fur.png";
import meatFood from "../../media/icons/meat_feed.png";
import caveShelter from "../../media/icons/cave_shelter.png";
import { ImageComponent } from "../reusableComponents/ImageComponent";

export const InfoBanner = (props) => {
  const { timerFinished } = props;
  const { survivorState } = props;

  const printResults = () => {
    return survivorState.map((item, index) => {
      if (item.eliminated) return null;
      return (
        <Box
          key={index}
          color={theme.palette.primary.light}
          fontSize={40}
          fontWeight="bold"
          p={2}
          border={2}
          borderColor={theme.palette.primary.light}
          mx={2}
          borderRadius={2}
        >
          <Box
            bgcolor="primary.main"
            fontSize={40}
            p={2}
            borderRadius={2}
          >{`Survivor #${index + 1}`}</Box>
          <Box fontSize={20}>
            Food Count:{" "}
            <ImageComponent
              image={meatFood}
              iterations={item.foodCount}
              alt="meat"
            />
          </Box>
          <Box fontSize={20}>
            Fur Count:{" "}
            <ImageComponent
              image={fur}
              iterations={item.furCount}
              alt="animal fur"
            />
          </Box>
          <Box fontSize={20}>
            Shelter Count:{" "}
            <ImageComponent
              image={caveShelter}
              iterations={item.shelterCount}
              alt="cave"
            />
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box>
      <Box
        width="100%"
        bgcolor="text.disabled"
        color={theme.palette.primary.light}
        fontSize={40}
        fontWeight="bold"
        borderBottom={2}
        borderColor={theme.palette.primary.light}
        border={2}
        borderRadius={2}
      >
        List of Survivors:
      </Box>
      <Box
        bgcolor="info.main"
        color={theme.palette.primary.light}
        border={4}
        borderColor={theme.palette.primary.light}
      >
        {/* <Box fontSize={40} fontWeight="bold">
          List of Survivors:
        </Box> */}
        <Box
          color={theme.palette.primary.light}
          fontSize={40}
          fontWeight="bold"
          py={4}
          display="flex"
        >
          {timerFinished ? printResults() : "...awaiting results"}
        </Box>
      </Box>
    </Box>
  );
};
