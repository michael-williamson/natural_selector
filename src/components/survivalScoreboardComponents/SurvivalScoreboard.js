import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Survivors } from "./Survivors";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { HelpDialogComponent } from "../reusableComponents/HelpDialogComponent";
import { SliderSelectorComponent } from "../reusableComponents/SliderSelectorComponent";
import { MenuComponent } from "../homePageComponents/MenuComponent";
import { environmentPathObject } from "../../helperFunctions";

export const SurvivalScoreboard = (props) => {
  const { handleSimulation } = props;
  const { handleResetSimulation } = props;
  const { beginSimulation } = props;
  const { setBeginSimulation } = props;
  const { handleClickNumSurvivors } = props;
  const { numberSurvivors } = props;
  const { survivorState } = props;
  const { timer, setTimer } = props;
  const [countDown, setCountDown] = useState(30);
  const [countDownFinished, setCountDownFinished] = useState(false);
  const theme = useTheme();
  const expanded = useMediaQuery(theme.breakpoints.up("lg"));
  const { environmentsPath, setEnvironmentsPath } = props;

  useEffect(() => {
    if (!beginSimulation.start) return;
    const clearCountDown = setInterval(countDownFN, 1000);
    function countDownFN() {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(clearCountDown);
          setCountDownFinished(true);
          return timer;
        }
        return (prev -= 1);
      });
    }

    return () => {
      console.log("countdown cleared");
      clearInterval(clearCountDown);
    };
  }, [setCountDown, timer, beginSimulation]);

  useEffect(() => {
    if (beginSimulation.start) return;
    setCountDown(timer);
  }, [beginSimulation.start, timer]);

  useEffect(() => {
    countDownFinished &&
      setBeginSimulation((prev) => {
        prev.start = false;
        prev.finished = true;
        return { ...prev };
      });
  }, [countDownFinished, setBeginSimulation]);

  useEffect(() => {
    beginSimulation.finished && setCountDownFinished(false);
  }, [beginSimulation.finished]);

  return (
    <Box bgcolor="primary.main">
      <Box fontSize={40} fontWeight="bold" color="primary.light">
        Survival Scoreboard
      </Box>
      <Box py={2}>
        <Button
          variant="contained"
          onClick={handleSimulation(true, false)}
          color="success"
          disabled={beginSimulation.start || beginSimulation.finished}
        >
          <Box fontWeight="bold">Begin Simulation</Box>
        </Button>
      </Box>
      <Box pb={4}>
        <Button
          variant="contained"
          onClick={handleResetSimulation}
          color="error"
        >
          <Box fontWeight="bold">Reset</Box>
        </Button>
      </Box>
      <Box>
        <MenuComponent
          environmentsPath={environmentsPath}
          setEnvironmentsPath={setEnvironmentsPath}
          environmentPathObject={environmentPathObject}
          dimensions={50}
          disabled={beginSimulation.start || beginSimulation.finished}
        />
      </Box>
      <Box py={4}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box py={2} fontSize={20} fontWeight="bold" color="primary.light">
            Number of Survivors:
          </Box>
          <Box pl={2}>
            <HelpDialogComponent
              Icon={HelpOutlineOutlinedIcon}
              messageText="Maximum amount is 10"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-around">
          <Button
            onClick={handleClickNumSurvivors(1)}
            variant="contained"
            color="success"
            disabled={beginSimulation.start || beginSimulation.finished}
          >
            <Box fontWeight="bold">+</Box>
          </Button>
          <Box fontSize={30} fontWeight="bold" color="primary.light">
            {numberSurvivors.count}
          </Box>
          <Button
            onClick={handleClickNumSurvivors(0)}
            variant="contained"
            color="success"
            disabled={beginSimulation.start || beginSimulation.finished}
          >
            <Box fontWeight="bold">-</Box>
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" py={2} alignItems="center">
        <Box fontSize={20} fontWeight="bold" color="primary.light">
          Timer:
        </Box>
        <Box fontSize={30} fontWeight="bold" color="primary.light" px={2}>
          {countDown}
        </Box>
        <Box fontSize={20} fontWeight="bold" color="primary.light">
          seconds
        </Box>
      </Box>
      <Box>
        <Box
          fontSize={20}
          fontWeight="bold"
          color={
            numberSurvivors.firstElimination ? "text.disabled" : "primary.light"
          }
        >
          First Elimination @ {Math.floor(timer / 2)} seconds
        </Box>
      </Box>
      <Box>
        <Box
          fontSize={20}
          fontWeight="bold"
          color={
            numberSurvivors.secondElimination
              ? "text.disabled"
              : "primary.light"
          }
        >
          Second Elimination @ {Math.floor(timer / 4)} seconds
        </Box>
      </Box>
      <Box>
        <SliderSelectorComponent
          setState={setTimer}
          state={timer}
          disabled={beginSimulation.start || beginSimulation.finished}
        />
      </Box>
      <Box maxHeight={500} overflow="scroll">
        <Accordion expanded={expanded}>
          <AccordionSummary
            expandIcon={expanded ? "" : <ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                borderRadius: 1,
                p: 2,
                color: "primary.light",
                bgcolor: "primary.main",
              }}
            >
              Survivors
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Survivors
              survivorState={survivorState}
              environmentsPath={environmentsPath}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};
