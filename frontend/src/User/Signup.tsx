import React, { useState, ChangeEvent } from "react";
import { Container, Typography, Box, TextField, Button, Grid, Link } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import avatar from '../assets/avatar.jpeg';
import { CreateUserInfo, createUser, googleSignin, parseLocalStorageData } from "./userService";
import {uploadFile} from './../File/FileService';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const theme = createTheme();

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const GoogleLoginContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 15,
  width: "100%"
});

export const Signup: React.FC = () => {
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const pickedImage = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  } 

  const handleSnackbarClose = () => {
    setErrorSnackbarOpen(false);
    setErrorMessage('');
  };

  const displayErrorSnackbar = (error: string) => {
    setErrorMessage(error);
    setErrorSnackbarOpen(true);
  };

  const clickedRegister = async () => {
    // Check for empty fields
    if (!name) {
      setNameError('Name is required');
      return;
    }
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    // Clear any previous error messages
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);

		try {
      const url = await uploadFile(imageFile)

      const newUser: CreateUserInfo = {
        email: email,
        password: password,
        name: name,
        imageUrl: url
      };

      const res = await createUser(newUser);

      if (res.status < 200 || res.status >= 400) {
        console.error('Error during registration:', res.data);
        displayErrorSnackbar(`Error during registration: ${res.data}. Please try again. `);
      }

      else {
        navigate('/signin', { replace: true });

      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await googleSignin(credentialResponse);
      parseLocalStorageData(response.data);

      console.log(response);
      navigate('/',  { replace: true }); 
    }
    catch(error) {
      console.log(error);
      console.error(error);
    }
  }

  const onGoogleLoginFaliure = () => {
    console.log("Google login failed!");
  }

	return (
		<div style={{ background: "linear-gradient(to bottom, #ffffff, #2196f3)" }}>
			<ThemeProvider theme={theme}>
				<Container
					component="main"
					maxWidth="xs"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}>
					{/* Sign Up Banner */}
          <Typography
						component="h1"
						variant="h5"
						sx={{
						marginBottom: 4,
						fontSize: "4rem",
						color: "#ffffff",
						fontWeight: "bold",
						position: "relative",
						textAlign: "center",
						// Add a black border around the text
						WebkitTextStroke: "1px black", // for WebKit browsers
						textStroke: "2px black", // for other browsers
						}}
						>
							Sign Up
						</Typography>

          {/* Signup Form */}
          <Box
            sx={{
              background: 'white',
              borderRadius: 4,
              padding: 3,
              boxShadow: 2,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <form>

            <Grid container justifyContent="center" alignItems="center">
            <Grid item>

            <Box>
              <img
                src={imageFile === null ? avatar : URL.createObjectURL(imageFile)}
                alt="Avatar"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  marginBottom: '20px'
                }}
              />
            </Box>
             

           </Grid>
            </Grid>

            <Button sx={{
              background: '#2196f3' }} size="small" component="label" variant="contained" startIcon={<CloudUploadIcon />}>
              Upload photo
              <VisuallyHiddenInput type="file" onChange={pickedImage}/>
            </Button>
            
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                error={!!nameError}
                helperText={nameError}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(null); // Clear error on input change
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null); // Clear error on input change
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(null); // Clear error on input change
                }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ marginTop: 2, backgroundColor: '#2196f3', color: 'white' }}
                onClick={clickedRegister}
              >
                Register
              </Button>
              <GoogleLoginContainer>
              <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFaliure} width="350" locale="en_US"/>
              </GoogleLoginContainer>

              <Typography
							variant="body2"
							color="textSecondary"
							sx={{ marginTop: 3, textAlign: "center" }}
							>
							Have an account already?{" "}

							<Link
							component="button"
							variant="body2"
							 onClick={() => {
							 	navigate("/signin", {replace: true});
							 }}
							sx={{ fontWeight: "bold", cursor: "pointer" }}
							>
							Sign In
							</Link>
							</Typography>

            </form>
          </Box>

          <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            sx={{
              backgroundColor: theme => theme.palette.error.main,
            }}
            message={<span>{errorMessage}</span>}
          />
        </Snackbar>

        </Container>
      </ThemeProvider>
    </div>
  );
};
