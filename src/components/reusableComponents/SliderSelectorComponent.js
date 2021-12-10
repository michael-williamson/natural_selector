import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}seconds`;
}

export const SliderSelectorComponent = (props) => {
  const { state, setState, setTotalTime } = props;
  const handleChange = (event) => {
    const value = event.target.value;
    setState(value);
    setTotalTime(value);
  };
  return (
    <Box px={2}>
      <Slider
        aria-label="Seconds"
        defaultValue={state}
        getAriaValueText={valuetext}
        value={state}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={30}
        max={120}
        onChange={handleChange}
        color="secondary"
      />
    </Box>
  );
};
