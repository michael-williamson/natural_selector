import React from "react";
import { Box } from "@mui/system";
import { theme } from "../../Theme";
import { ImageComponent } from "../reusableComponents/ImageComponent";

export const IndividualSurvivor = (props) => {
  const { survivorNumber } = props;
  const { foodCount } = props;
  const { shelterCount } = props;
  const { waterCount } = props;
  const { adaptation } = props;
  const { survived } = props;
  const { environmentIconObject } = props;
  return (
    <Box
      p={1}
      bgcolor="info.main"
      border={survived ? 2 : 0}
      borderColor={theme.palette.primary.light}
    >
      <Box display="flex" flexDirection="column">
        <Box
          color={theme.palette.primary.light}
          bgcolor="primary.main"
          fontSize={14}
          fontWeight="bold"
          width={1}
        >{`Survivor #${survivorNumber}`}</Box>

        <Box display="flex" width={1} flexDirection="column">
          <Box display="flex" width={1}>
            <Box color="primary.light">Water: </Box>
            <Box>
              <ImageComponent
                iterations={waterCount}
                image={environmentIconObject.water}
                alt="water icon"
              />
            </Box>
          </Box>
          <Box display="flex" width={1}>
            <Box color="primary.light">Food: </Box>
            <Box>
              <ImageComponent
                iterations={foodCount}
                image={environmentIconObject.food}
                alt="food icon"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box color="primary.light">Shelter: </Box>
            <Box>
              <ImageComponent
                iterations={shelterCount}
                image={environmentIconObject.shelter}
                alt="shelter icon"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box color="primary.light">Adaptations: </Box>
            <Box>
              <ImageComponent
                iterations={adaptation}
                image={environmentIconObject.adaptation}
                alt="adaptation icon"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box></Box>
      <Box></Box>
    </Box>
  );
};
