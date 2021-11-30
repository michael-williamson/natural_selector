import { Grid } from "@mui/material";
import "./App.css";
import { NodeWindow } from "./components/nodeComponents/NodeWindow";
import { SurvivalScoreboard } from "./components/survivalScoreboardComponents/SurvivalScoreboard";

function App() {
  return (
    <Grid container className="App">
      <Grid item xs={2}>
        <SurvivalScoreboard />
      </Grid>
      {/* <NodeGenerator numberOfNodes={20} margin={10} /> */}
      <Grid item xs={10}>
        <div>
          <NodeWindow />
        </div>
      </Grid>
    </Grid>
  );
}

export default App;
