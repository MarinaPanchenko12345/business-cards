import React from "react";
import { useTheme } from "@mui/material/styles";
import { FadeLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "50px auto",
};

function Loading({ loading }) {
  const theme = useTheme();
  const loaderColor =
    theme.palette.mode === "dark" ? "#0c0c0cdf" : theme.palette.primary.main;

  return (
    <div className='sweet-loading' style={{ width: "100%" }}>
      <FadeLoader
        color={loaderColor}
        loading={loading}
        cssOverride={override}
        size={25}
      />
    </div>
  );
}

export default Loading;
