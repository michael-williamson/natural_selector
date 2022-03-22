import { createTheme } from "@mui/material/styles";

const googleFonts = {
  chewy: "Chewy",
  luckiestGuy: "Luckiest Guy",
  paletteMosaic: "Palette Mosaic",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#fff",
    },
    secondary: {
      main: "#fff",
    },
    customColors: {
      lightBlue: "#7af3ff",
      bgBlue: "#56b0ff",
    },
  },
  fonts: {
    ...googleFonts,
  },
});

//fonts for easy copy paste
// font-family: 'Chewy', cursive;
// font-family: 'Luckiest Guy', cursive;
// font-family: 'Palette Mosaic', cursive;
