import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import AddCardIcon from "@mui/icons-material/AddCard";
import "./../App.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const role = useSelector((state) => state.token.role);
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  };

  return (
    <div className='footer' style={style}>
      <Link to='/about' style={{ textDecoration: "none", color: "white" }}>
        <ErrorTwoToneIcon fontSize='large' />
        <div>About</div>
      </Link>
      {(role === "admin" || role === "business") && (
        <>
          <Link
            to='/favorites'
            style={{ textDecoration: "none", color: "white" }}
          >
            <FavoriteTwoToneIcon fontSize='large' />
            <div>Favorite</div>
          </Link>
          <Link
            to='/my cards'
            style={{ textDecoration: "none", color: "white" }}
          >
            <AddCardIcon fontSize='large' />
            <div>My Cards</div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Footer;
