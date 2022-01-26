import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { desertMenu, mountainsMenu, rainForestMenu } from "../../media";

const Image = styled("img")(
  ({ theme, dimensions, environmentspath, currentimg }) => ({
    width: dimensions,
    height: dimensions,
    borderRadius: 5,
    border: "5px solid",
    borderColor:
      environmentspath === currentimg
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    "&:hover": {
      borderColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  })
);

export const MenuComponent = (props) => {
  const {
    environmentsPath,
    setEnvironmentsPath,
    environmentPathObject,
    dimensions,
    imageTextSize,
    imageTextPadding,
    disabled,
  } = props;
  const handlePathClick = (prop) => () => {
    !disabled && setEnvironmentsPath(prop);
  };
  return (
    <Grid container item justifyContent="space-around">
      <Grid item xs={3}>
        <Box
          fontWeight="bold"
          color="secondary.main"
          fontSize={imageTextSize}
          pb={imageTextPadding}
        >
          Hot Desert
        </Box>
        <Box onClick={handlePathClick(environmentPathObject.desert)}>
          <Image
            src={desertMenu}
            alt="desert"
            dimensions={dimensions}
            environmentspath={environmentsPath}
            currentimg={environmentPathObject.desert}
          />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          fontWeight="bold"
          color="secondary.main"
          fontSize={imageTextSize}
          pb={imageTextPadding}
        >
          Mountains
        </Box>
        <Box onClick={handlePathClick(environmentPathObject.mountain)}>
          <Image
            src={mountainsMenu}
            alt="mountains"
            dimensions={dimensions}
            environmentspath={environmentsPath}
            currentimg={environmentPathObject.mountain}
          />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box
          fontWeight="bold"
          color="secondary.main"
          fontSize={imageTextSize}
          pb={imageTextPadding}
        >
          Rain Forest
        </Box>
        <Box onClick={handlePathClick(environmentPathObject.rainForest)}>
          <Image
            src={rainForestMenu}
            alt="rain forest"
            dimensions={dimensions}
            environmentspath={environmentsPath}
            currentimg={environmentPathObject.rainForest}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
