import { Grid } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { InfoBanner } from "./components/infoBannerComponents/InfoBanner";
import { CanvasContainer } from "./components/nodeComponents/CanvasContainer";
import { SurvivalScoreboard } from "./components/survivalScoreboardComponents/SurvivalScoreboard";
import { survivorStateFN } from "./helperFunctions";

function App() {
  const [timer, setTimer] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [beginSimulation, setBeginSimulation] = useState(false);
  const [numberSurvivors, setNumberSurvivors] = useState(10);
  const [survivorState, setSurvivorState] = useState(survivorStateFN(10));

  const handleClickNumSurvivors = (input) => (event) => {
    setNumberSurvivors((prev) => {
      if (input) {
        let currentNum = prev + 1;
        currentNum < 10 &&
          setSurvivorState((prev) => {
            prev.push({
              foodCount: 0,
              shelterCount: 0,
              furCount: 0,
              eliminated: false,
            });
            return [...prev];
          });
        return currentNum >= 9 ? 10 : currentNum;
      } else {
        let currentNum = prev - 1;
        currentNum > 0 &&
          setSurvivorState((prev) => {
            prev.pop();
            return [...prev];
          });
        return currentNum <= 0 ? 1 : currentNum;
      }
    });
  };

  const handleClickSimulation = () => {
    setTimer(15);
    setTotalTime(15);
    setBeginSimulation(true);
    let endTimer = setInterval(countDownFN, 1000);
    function countDownFN() {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(endTimer);
          setBeginSimulation(false);
          return 15;
        }
        return prev - 1;
      });
    }
  };
  return (
    <Grid container className="App">
      <Grid item xs={2}>
        <SurvivalScoreboard
          handleClickSimulation={handleClickSimulation}
          handleClickNumSurvivors={handleClickNumSurvivors}
          timer={timer}
          numberSurvivors={numberSurvivors}
          survivorState={survivorState}
        />
      </Grid>
      <Grid item xs={10}>
        <CanvasContainer
          totalTime={totalTime}
          beginSimulation={beginSimulation}
          numberSurvivors={numberSurvivors}
          survivorState={survivorState}
          setSurvivorState={setSurvivorState}
        />

        <InfoBanner />
      </Grid>
      <Grid container item xs={10}></Grid>
    </Grid>
  );
}

export default App;
