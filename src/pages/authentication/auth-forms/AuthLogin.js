import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../api/UserService';
import { useDispatch } from 'react-redux';
import {
  Button,

  FormHelperText,
  Grid,
  
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,

  Alert,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { setUserToken, setUserEmail } from '../../../store/reducers/UserSlice';

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'info' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const response = await UserService.login(values);
      dispatch(setUserToken(response.data.accessToken));
      dispatch(setUserEmail(values.email));
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('userEmail', values.email);
      setAlert({ show: true, message: 'Login successful!', severity: 'success' });
      navigate('/UserProfile');
    } catch (error) {
      setAlert({
        show: true,
        message: error.response?.data?.message || 'An error occurred during login.',
        severity: 'error',
      });
      setStatus({ success: false });
      setErrors({ submit: error.response?.data?.message || error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <Formik
        initialValues={{ email: '', password: '', submit: null }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel htmlFor="email-login">Email Address</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email && errors.email)}
                  placeholder="Enter email address"
                />
                <FormHelperText error={Boolean(touched.email && errors.email)}>
                  {touched.email && errors.email}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="password-login">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                  error={Boolean(touched.password && errors.password)}
                />
                <FormHelperText error={Boolean(touched.password && errors.password)}>
                  {touched.password && errors.password}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
