import React from "react";
import { Box } from "@mui/system";
import { theme } from "../../Theme";
import { ImageComponent } from "../reusableComponents/ImageComponent";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { HelpDialogComponent } from "../reusableComponents/HelpDialogComponent";

export const InfoBanner = (props) => {
  const { beginSimulation } = props;
  const { survivorState } = props;
  const { infoBannerRef } = props;
  const { environmentIconObject } = props;

  const PlaceHolderTemplate = () => {
    return (
      <Box
        color={theme.palette.primary.light}
        fontSize={40}
        fontWeight="bold"
        p={2}
        border={2}
        borderColor={theme.palette.primary.light}
        mx={2}
        borderRadius={2}
        visibility="hidden"
      >
        <Box bgcolor="primary.main" fontSize={40} p={2} borderRadius={2}>
          Survivor ?
        </Box>
        <Box fontSize={20}>
          <Box>Food Count:</Box>
        </Box>
        <Box fontSize={20}>
          <Box>Fur Count:</Box>
        </Box>
        <Box fontSize={20}>
          <Box>Shelter Count:</Box>
        </Box>
      </Box>
    );
  };

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
          <Box fontSize={20} display="flex">
            <Box>Food Count:</Box>
            <ImageComponent
              iterations={item.foodCount}
              image={environmentIconObject.food}
              alt="food icon"
            />
          </Box>
          <Box fontSize={20} display="flex">
            <Box>Water Count:</Box>
            <ImageComponent
              iterations={item.waterCount}
              image={environmentIconObject.water}
              alt="water icon"
            />
          </Box>
          <Box fontSize={20} display="flex">
            <Box>Shelter Count:</Box>
            <ImageComponent
              iterations={item.shelterCount}
              image={environmentIconObject.shelter}
              alt="shelter icon"
            />
          </Box>
          <Box fontSize={20} display="flex">
            <Box>Adaptation:</Box>
            <ImageComponent
              iterations={item.adaptation}
              image={environmentIconObject.adaptation}
              alt="adaptation icon"
            />
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box ref={infoBannerRef}>
      <Box
        width="100%"
        bgcolor="primary.main"
        color={theme.palette.primary.light}
        fontWeight="bold"
        borderBottom={2}
        borderColor={theme.palette.primary.light}
        border={2}
        borderRadius={2}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box py={2} fontSize={40} fontWeight="bold" color="primary.light">
            List of Survivors
          </Box>
          <Box pl={2}>
            <HelpDialogComponent
              Icon={HelpOutlineOutlinedIcon}
              messageText="Survivors must acquire at least 1 food, 1 water, and 1 shelter to develop an adaptation.  The adaptation qualifies for survival"
            />
          </Box>
        </Box>
      </Box>
      <Box
        bgcolor="info.main"
        color={theme.palette.primary.light}
        border={4}
        borderColor={theme.palette.primary.light}
      >
        <Box
          color={theme.palette.primary.light}
          fontSize={40}
          fontWeight="bold"
          py={4}
          display="flex"
        >
          {beginSimulation.finished ? printResults() : <PlaceHolderTemplate />}
        </Box>
      </Box>
    </Box>
  );
};
