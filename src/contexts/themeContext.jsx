import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Theme({ darkMode, children }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: darkMode ? "#6a1b9a" : "#0c0c0cdf",
      },
      secondary: {
        main: darkMode ? "#dfc7ee" : "#a5a4a4f3",
      },
      third: {
        main: darkMode ? "#AAAAAA" : "#555555",
      },
      text: {
        primary: darkMode ? "#300937" : "#ffffff",
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
