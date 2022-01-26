import React from "react";
import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { dnaIcon, grassIcon, waterIcon } from "../../media";
import { MenuComponent } from "./MenuComponent";
import "./HomePage.css";
import { Link } from "react-router-dom";

export const HomePage = (props) => {
  const { environmentsPath, setEnvironmentsPath, environmentPathObject } =
    props;

  const theme = useTheme();
  const smallImage = useMediaQuery(theme.breakpoints.down("sm"));
  const mdImage = useMediaQuery(theme.breakpoints.down("md"));

  const imageSize = () => {
    if (smallImage) {
      return 50;
    } else if (mdImage) {
      return 100;
    }
    return 200;
  };

  return (
    <Grid item xs={10} className="homePageContainer">
      <Box
        sx={{
          borderRight: 4,
          borderLeft: 4,
          borderColor: "primary.main",
          height: { lg: "100%" },
        }}
      >
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          direction="column"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid container item xs={12} justifyContent="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <Box
                sx={{
                  color: "secondary.main",
                  p: 4,
                  bgcolor: "primary.main",
                  borderRadius: 5,
                  my: { xs: 2, md: 4 },
                }}
              >
                <Box fontWeight="bold" fontSize={40}>
                  Natural Selector
                </Box>
                <Box>
                  <img src={dnaIcon} alt="dna" />
                </Box>
                <Box>
                  <img src={grassIcon} alt="grass" />
                </Box>
                <Box>
                  <img src={waterIcon} alt="water" />
                </Box>
              </Box>
            </Grid>
            <Grid container item xs={10} md={4}>
              <Grid item>
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "secondary.main",
                    p: 4,
                    mt: { xs: 2 },
                    mb: { xs: 2 },
                    bgcolor: "primary.main",
                    borderRadius: 5,
                  }}
                >
                  Simulations performed in a variety of environments to
                  determine what genetics get to live and continue a species
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "secondary.main",
                    p: 4,
                    mt: { xs: 2 },
                    mb: { xs: 2 },
                    bgcolor: "primary.main",
                    borderRadius: 5,
                  }}
                >
                  Each Survivor has to have acquired certain resources at
                  certain time intervals to be able to continue, once completed
                  the Survivors that passed requirements will get to live on!
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Box
              fontWeight="bold"
              fontSize={20}
              color="secondary.main"
              px={4}
              py={2}
              my={2}
              bgcolor="primary.main"
              borderRadius={5}
            >
              Choose Environment:
            </Box>
          </Grid>

          <MenuComponent
            environmentsPath={environmentsPath}
            setEnvironmentsPath={setEnvironmentsPath}
            environmentPathObject={environmentPathObject}
            dimensions={imageSize()}
            imageTextSize={12}
            imageTextPadding={1}
          />

          <Grid item xs={10}>
            <Button>
              <Link to="environments">
                <Box
                  sx={{
                    px: 4,
                    bgcolor: "primary.main",
                    borderRadius: 5,
                    fontWeight: "bold",
                    my: { xs: 4 },
                  }}
                >
                  <Box>{environmentsPath} Canvas</Box>
                  <Box fontWeight="bold" fontSize={20} color="secondary.main">
                    Click to Start!
                  </Box>
                </Box>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
