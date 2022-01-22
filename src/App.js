import { Routes, Route } from "react-router";
import { useState } from "react";
import { Grid } from "@mui/material";
import "./App.css";
import { HomePage } from "./components/homePageComponents/HomePage";
import { AppPage } from "./components/homePageComponents/AppPage";
import { environmentPathObject } from "./helperFunctions";

function App() {
  const [environmentsPath, setEnvironmentsPath] = useState(
    environmentPathObject.desert
  );
  return (
    <Grid container className="App" justifyContent="center">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              environmentsPath={environmentsPath}
              setEnvironmentsPath={setEnvironmentsPath}
              environmentPathObject={environmentPathObject}
            />
          }
        />
        <Route
          path="environments"
          element={
            <AppPage
              environmentsPath={environmentsPath}
              setEnvironmentsPath={setEnvironmentsPath}
            />
          }
        />
      </Routes>
    </Grid>
  );
}

export default App;
