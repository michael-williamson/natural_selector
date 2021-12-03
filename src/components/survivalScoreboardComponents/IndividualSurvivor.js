import React from "react";
import { Box } from "@mui/system";
import fur from "../../media/icons/fur.png";
import meatFood from "../../media/icons/meat_feed.png";
import caveShelter from "../../media/icons/cave_shelter.png";
import { theme } from "../../Theme";

const imgStyle = {
  width: "20px",
  height: "20px",
};

const ImageComponent = (props) => {
  const { image } = props;
  const { alt } = props;
  const { iterations } = props;

  return Array(iterations)
    .fill(0)
    .map((item, index) => (
      <img src={image} alt={alt} key={`${alt}${index}`} style={imgStyle} />
    ));
};

export const IndividualSurvivor = (props) => {
  const { survivorNumber } = props;
  const { foodCount } = props;
  const { shelterCount } = props;
  const { furCount } = props;
  return (
    <Box p={1} bgcolor="info.main">
      <Box display="flex" flexDirection="column">
        <Box
          color={theme.palette.primary.light}
          fontSize={14}
          fontWeight="bold"
          width={1}
        >{`Survivor #${survivorNumber}`}</Box>

        <Box display="flex" width={1} flexDirection="column">
          <Box display="flex" width={1}>
            <Box color="primary.light">Fur: </Box>
            <Box>
              <ImageComponent
                iterations={furCount}
                image={fur}
                alt="animal fur"
              />
            </Box>
          </Box>
          <Box display="flex" width={1}>
            <Box color="primary.light">Food: </Box>
            <Box>
              <ImageComponent
                iterations={foodCount}
                image={meatFood}
                alt="meat"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box color="primary.light">Shelter: </Box>
            <Box>
              <ImageComponent
                iterations={shelterCount}
                image={caveShelter}
                alt="cave icon"
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
