import React from "react";
import {
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";

const UserMenu = ({
  anchorElUser,
  handleOpenUserMenu,
  handleCloseUserMenu,
  settings,
  handleLogout,
}) => {
  const role = useSelector((state) => state.token.role);

  if (role === "guest") {
    return null;
  }

  return (
    <>
      <Tooltip title='Logout'>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src='/broken-image.jpg' sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleLogout}>
            <Typography textAlign='center' style={{ color: "black" }}>
              {setting}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserMenu;
