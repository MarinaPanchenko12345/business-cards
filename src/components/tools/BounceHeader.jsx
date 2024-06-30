import React, { useEffect, useState } from "react";
import "./BounceHeader.css";
import { useTheme } from "@mui/material/styles";

const BounceHeader = ({ text }) => {
  const [bounceClass, setBounceClass] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setBounceClass("bounce-once");
  }, []);

  return (
    <div className='wrapper'>
      <h2
        className={`bounce ${bounceClass}`}
        style={{
          color: theme.palette.text.primary,
          WebkitBoxReflect: `below -15px linear-gradient(transparent, ${
            theme.palette.mode === "dark" ? "#7a7979df" : "#b10f906c"
          })`,
        }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            style={{ marginRight: char === " " ? "0.5em" : "0" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default BounceHeader;
