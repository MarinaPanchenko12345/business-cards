import React from "react";
import { IconButton, Avatar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const signUpColor = "#e08cef";
const loginColor = "#d8118c";

const UserActions = ({ userActions }) => (
  <>
    {userActions.map((action) => (
      <Tooltip
        key={action}
        title={
          <Typography  component='div'>
            {action}
          </Typography>
        }
        sx={{
          fontSize: "0.7em",
          padding: "1em", 
        }}
      >
        <IconButton sx={{ p: 1 }} component={Link} to={`/${action}`}>
          <Avatar
            sx={{
              bgcolor: action === "SignUp" ? signUpColor : loginColor,
              width: 30,
              height: 30,
            }}
          >
            {action === "SignUp" ? "S" : "L"}
          </Avatar>
        </IconButton>
      </Tooltip>
    ))}
  </>
);

export default UserActions;
