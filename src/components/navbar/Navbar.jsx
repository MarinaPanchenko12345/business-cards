import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AppleIcon from "@mui/icons-material/Apple";
import CustomizedSwitches from "../tools/CustomizedSwitch";
import { Link } from "react-router-dom";
import { logout } from "../../slices/TokenSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/TokenSlice";
import NavbarFunctions from "./NavbarFunctions";
import NavLinks, { NavButtons } from "./NavLinks";
import UserActions from "./UserActions";
import UserMenu from "./UserMenu";
import { SearchContext } from "../../contexts/searchContext";
import SearchBox from "../tools/SearchBox";

const Navbar = ({ darkMode, setDarkMode }) => {
  const role = useSelector((state) => state.token.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchText, setSearchText } = useContext(SearchContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);

  const pages = [
    "About",
    ...(role === "user" || role === "admin" || role === "business"
      ? ["Favorites", "My Cards"]
      : []),
    ...(role === "admin" ? ["Sandbox"] : []),
  ];
  const userActions = role === "guest" ? ["SignUp", "Login"] : [];
  const settings = role !== "guest" ? ["Logout"] : [];

  const {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleLogout,
    handleCloseUserMenu,
  } = NavbarFunctions({ dispatch, navigate, logout: () => dispatch(logout()) });

  return (
    <AppBar position='sticky'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AppleIcon
            sx={{ display: { xs: "none", md: "flex", fontSize: 35 } }}
          />
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Business Cards
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              marginLeft: "-15px",
            }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <NavLinks pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
            </Menu>
          </Box>
          <AppleIcon
            sx={{ display: { xs: "flex", md: "none", fontSize: 35 } }}
          />
          <Typography
            variant='h8'
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 500,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavButtons pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
          </Box>
          <SearchBox searchText={searchText} setSearchText={setSearchText} />
          <CustomizedSwitches darkMode={darkMode} setDarkMode={setDarkMode} />
          <UserMenu
            anchorElUser={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            settings={settings}
            handleLogout={handleLogout}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
          >
            <UserActions userActions={userActions} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
