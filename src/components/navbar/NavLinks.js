import React from "react";
import { Button, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavLinks = ({ pages, handleCloseNavMenu }) => (
  <>
    {pages.map((page) => (
      <MenuItem key={page} onClick={handleCloseNavMenu}>
        <Typography textAlign='center'>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/${page}`}
          >
            {page}
          </Link>
        </Typography>
      </MenuItem>
    ))}
  </>
);

export const NavButtons = ({ pages, handleCloseNavMenu }) => (
  <>
    {pages.map((page) => (
      <Button
        key={page}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={`/${page}`}
        >
          {page}
        </Link>
      </Button>
    ))}
  </>
);

export default NavLinks;
