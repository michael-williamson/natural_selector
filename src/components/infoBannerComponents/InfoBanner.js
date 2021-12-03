import React from "react";
import { Box } from "@mui/system";
import { theme } from "../../Theme";

export const InfoBanner = () => {
  return (
    <Box>
      <Box
        width="100%"
        bgcolor="text.disabled"
        color={theme.palette.primary.light}
        fontSize={40}
        fontWeight="bold"
      >
        InfoBanner
      </Box>
    </Box>
  );
};
