import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
} from '@mui/material';

const AuthRegister = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: 'developer',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    open: false,
  });

  const navigate = useNavigate();

  const API_URL = 'http://localhost:4000/api/users/register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setUserData({ ...userData, roles: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(userData).forEach(key => formData.append(key, userData[key]));
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAlert({
        type: 'success',
        message: 'Registration successful! Redirecting to login...',
        open: true,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'An error occurred during registration.',
        open: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {alert.open && (
          <Grid item xs={12}>
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="fname"
            value={userData.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            value={userData.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={userData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography variant="subtitle1">Select Role:</Typography>
            <RadioGroup
              name="roles"
              value={userData.roles}
              onChange={handleRoleChange}
              row
            >
              <FormControlLabel
                value="developer"
                control={<Radio />}
                label="Developer"
              />
              <FormControlLabel
                value="consultant"
                control={<Radio />}
                label="Consultant"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained">
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthRegister;
