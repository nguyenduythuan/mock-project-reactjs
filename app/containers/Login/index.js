import React, { memo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import PropsTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { loginRequest } from './actions';
import reducer from './reducer';
import { makeSelectLogged } from './selectors';
import saga from './saga';
import useStyles from './styles';

const key = 'login';

function SignIn(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [values, setValues] = useState({
    email: '',
    password: '',
    submit: false,
    isLoggedIn: false,
  });
  const classes = useStyles();
  const handleSubmit = event => {
    if (event) event.preventDefault();
    props.onLoginRequest(values.email, values.password, values.submit);
  };
  const handleChange = event => {
    event.persist();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const renderRedirect = () =>
    localStorage.getItem('token') ? <Redirect to="/" /> : null;

  return (
    <div>
      {renderRedirect()}
      <Container component="main" maxWidth="xs">
        <Box component="div" mt={15} mb={5}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                margin="normal"
                id="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                error={props.touched.email && !!props.errors.email}
              >
                <Field
                  name="email"
                  render={({ field }) =>
                    props.errors.email ? (
                      <TextField
                        error
                        label="Email Address"
                        id="outlined-error"
                        variant="outlined"
                        {...field}
                      />
                    ) : (
                      <TextField
                        label="Email Address"
                        variant="outlined"
                        {...field}
                      />
                    )
                  }
                />
                {props.touched.email && (
                  <FormHelperText>{props.errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                margin="normal"
                id="password"
                value={values.password}
                onChange={handleChange}
                error={props.touched.password && !!props.errors.password}
              >
                <Field
                  name="password"
                  render={({ field }) =>
                    props.errors.password ? (
                      <TextField
                        error
                        type="password"
                        label="Password"
                        id="outlined-error"
                        variant="outlined"
                        {...field}
                      />
                    ) : (
                      <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        {...field}
                      />
                    )
                  }
                />
                {props.touched.password && (
                  <FormHelperText>{props.errors.password}</FormHelperText>
                )}
              </FormControl>
              {props.errors.password || props.errors.email ? (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/reset-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/singup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
      <ToastContainer autoClose={5000} />
    </div>
  );
}

const FormikForm = withFormik({
  mapPropsToValues() {
    // Init form field
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password have 8 characters'),
  }),
})(SignIn);

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogged(),
});

const mapDispatchToProps = dispatch => ({
  onLoginRequest: (email, password, submit) => {
    dispatch(loginRequest(email, password, submit));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

SignIn.propTypes = {
  login: PropsTypes.bool,
  onLoginRequest: PropsTypes.func,
  touched: PropsTypes.object,
  errors: PropsTypes.object,
};

export default compose(
  withConnect,
  memo,
)(FormikForm);
