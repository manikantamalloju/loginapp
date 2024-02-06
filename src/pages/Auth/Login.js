// Login.js
import React, { useState } from "react";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import LoginImage from "../../assets/images/loginImage.jpg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import useToast from "../../Hooks/useToast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const firebaseConfig = {
  apiKey: "AIzaSyDDpS4ImPg_qgXoaHpMZzP1o-f98lKizx8",
  authDomain: "login-page-9eff6.firebaseapp.com",
  projectId: "login-page-9eff6",
  storageBucket: "login-page-9eff6.appspot.com",
  messagingSenderId: "1068696469411",
  appId: "1:1068696469411:web:bed4cc44fec58c105ca416",
};

initializeApp(firebaseConfig);

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const auth = getAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const signUp = async (payload) => {
    const { email, password } = payload;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Sign up successful");
      showToast("SignUp successful");
      setIsLogin(!isLogin);
      formik.resetForm();
    } catch (error) {
      console.error("Sign up error", error.message);
      showToast("Sign up error", "error");
    }
  };

  const login = async (payload) => {
    const { email, password } = payload;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Login successful");
      console.log("Login successful");
      localStorage.setItem("token", auth.currentUser.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error.message);
      showToast("Invalid credentials", "error");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
          "Password must contain at least one uppercase letter, one special character, and one digit"
        ),
    }),

    onSubmit: (values) => {
      // Implement your login logic here
      // alert("Form submitted");
      isLogin ? login(values) : signUp(values);
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <Container>
        <Grid container direction="row" justifySelf="center">
          <Grid item xs={12} md={5}>
            <Box
              padding={2}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="flex-start"
              minHeight="100vh"
            >
              <Paper sx={{ padding: "20px" }}>
                <Typography variant="h5">Login</Typography>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Box display="flex" alignItems="center">
                    <Typography mr={1}>
                      {isLogin ? "Not a member?" : "Already a member?"}
                    </Typography>
                    <Typography
                      onClick={() => {
                        setIsLogin(!isLogin);
                        formik.resetForm();
                      }}
                      sx={{ color: "blue", cursor: "pointer" }}
                    >
                      {!isLogin ? "Login" : "SignUp"}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 20 }}
                    type="submit"
                  >
                    {isLogin ? "Login" : "SignUp"}
                  </Button>
                </form>
              </Paper>
            </Box>
          </Grid>
          <Grid item md={1} />
          <Grid item md={6} alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <img src={LoginImage} width="90%" alt="login" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
