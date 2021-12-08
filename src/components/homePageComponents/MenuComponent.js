import React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { desertMenu, mountainsMenu, underwaterMenu } from "../../media";
import { theme } from "../../Theme";

const imageStyle = {
  width: "200px",
  height: "200px",
  borderRadius: 5,
  border: "5px solid",
  borderColor: theme.palette.primary.main,
  "::hover": {
    borderColor: theme.palette.primary.light,
  },
};

export const MenuComponent = (props) => {
  const { setEnvironmentsPath, environmentPathObject } = props;
  const handlePathClick = (prop) => () => {
    setEnvironmentsPath(prop);
  };
  return (
    <Grid container item justifyContent="space-around">
      <Grid item xs={3}>
        <Box fontWeight="bold" color="secondary.main">
          Hot Desert
        </Box>
        <Box onClick={handlePathClick(environmentPathObject.desert)}>
          <img src={desertMenu} alt="desert" style={imageStyle} />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box fontWeight="bold" color="secondary.main">
          Cold Mountainous
        </Box>
        <Box onClick={handlePathClick(environmentPathObject.mountain)}>
          <img src={mountainsMenu} alt="mountains" style={imageStyle} />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box fontWeight="bold" color="secondary.main">
          Open Water
        </Box>
        <Box onClick={handlePathClick(environmentPathObject.water)}>
          <img src={underwaterMenu} alt="underwater" style={imageStyle} />
        </Box>
      </Grid>
    </Grid>
  );
};
