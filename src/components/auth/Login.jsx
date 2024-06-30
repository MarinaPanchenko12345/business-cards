import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./../../slices/TokenSlice";
import { Link } from "react-router-dom";
import { LoginSchema } from "../../validationSchemes/AuthValidationSchema";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import useValidation from "./../../hooks/useValidation";
import { showAlert } from "./../tools/Aletrs";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const Login = () => {
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(LoginSchema);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    resetErrorMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) {
      return;
    }
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        formData
      );
      const token = await response.data;
      if (!token) {
        return;
      }
      dispatch(login(token));
      showAlert("success", "You have successfully logged in!");
      navigate("/");
    } catch (error) {
      showAlert("error", "Invalid credentials");
    }
  };

  const toggleVisibility = () => {
    setVisibility((prev) => !prev);
  };

  const EndAdorment = () => {
    return (
      <InputAdornment position='end'>
        <IconButton onClick={toggleVisibility}>
          {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  const isDisabled =
    formData.email === "" ||
    formData.password === "" ||
    Object.values(errorMessages).some((msg) => msg !== "");

  return (
    <Container maxWidth='xs' style={{ marginTop: "150px" }}>
      <Paper elevation={10} style={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              m: 1,
              backgroundColor: theme.palette.primary.main,
            }}
          >
            <LockOutlinedIcon fontSize='large' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={!!errorMessages.email}
              helperText={errorMessages.email}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={visibility ? "text" : "password"}
              id='password'
              autoComplete='current-password'
              value={formData.password}
              onChange={handleChange}
              error={!!errorMessages.password}
              helperText={errorMessages.password}
              InputProps={{
                endAdornment: (
                  <EndAdorment
                    visibility={visibility}
                    setVisibility={{ setVisibility }}
                  />
                ),
              }}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isDisabled}
            >
              Login
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link to='/signup'>Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
export default Login;
