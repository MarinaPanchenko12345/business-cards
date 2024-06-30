import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useValidation from "../../hooks/useValidation";
import { CardValidationSchema } from "../../validationSchemes/CardValidationShema";
import CardFormFields from "./../../models/CardFormFields";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import AddCardIcon from "@mui/icons-material/AddCard";
import { showAlert } from "./../tools/Aletrs.js";
import axios from "axios";
import "./Cards.css";

const NewCard = ({ onCardAdded, close }) => {
  const theme = useTheme();
  const style = {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.secondary.main,
  };
  const { errorMessages, validate, resetErrorMessages } =
    useValidation(CardValidationSchema);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      let lastObj = keys.reduce((obj, key) => {
        return (obj[key] = obj[key] || {});
      }, prev);
      lastObj[lastKey] = value;
      resetErrorMessages();
      return { ...prev };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
          formData,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        if (response.status === 201) {
          showAlert("success", "Card updated successfully!");
          onCardAdded(response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          showAlert(
            "warning",
            "This email is already in use. Please use a different email"
          );
        }
      }
    }
  };

  const handleCancel = () => {
    close();
  };

  return (
    <div className='form_container'>
      <Container
        maxWidth='lg'
        style={{ marginTop: "50px", marginBottom: "100px" }}
      >
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
              <AddCardIcon fontSize='large' />
            </Avatar>
            <Typography component='h1' variant='h5' margin={3}>
              Create New Card
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                {CardFormFields.map((field) => (
                  <Grid key={field.name} item xs={6} sm={field.block ? 8 : 4}>
                    <TextField
                      margin='dense'
                      fullWidth
                      size='small'
                      required={field.required}
                      id={field.name}
                      label={field.placeholder}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.name}
                      onChange={handleChange}
                      error={!!errorMessages[field.name]}
                      helperText={errorMessages[field.name]}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button type='submit' variant='contained' sx={{ ml: 1, mt: 5 }}>
                Create
              </Button>
              <Button
                variant='contained'
                sx={{ ml: 1, mt: 5 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default NewCard;
