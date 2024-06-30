import React, { useCallback } from "react";

const NavbarFunctions = ({ dispatch, navigate, logout }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/");
    handleCloseUserMenu();
  }, [dispatch, navigate, logout, handleCloseUserMenu]);

  return {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleLogout,
    handleCloseUserMenu,
  };
};

export default NavbarFunctions;
