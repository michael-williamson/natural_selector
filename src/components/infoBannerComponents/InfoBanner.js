import React from "react";
import { Box } from "@mui/system";
import { theme } from "../../Theme";
import { furIcon, meatIcon, caveIcon } from "../../media";
import { ImageComponent } from "../reusableComponents/ImageComponent";

export const InfoBanner = (props) => {
  const { beginSimulation } = props;
  const { survivorState } = props;
  const { infoBannerRef } = props;

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
              image={meatIcon}
              iterations={item.foodCount}
              alt="meat"
            />
          </Box>
          <Box fontSize={20} display="flex">
            <Box>Fur Count:</Box>
            <ImageComponent
              image={furIcon}
              iterations={item.furCount}
              alt="animal fur"
            />
          </Box>
          <Box fontSize={20} display="flex">
            <Box>Shelter Count:</Box>
            <ImageComponent
              image={caveIcon}
              iterations={item.shelterCount}
              alt="cave"
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
