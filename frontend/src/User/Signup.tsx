// SignUp.tsx
import React, { useState, ChangeEvent } from "react";
import { Container, Typography, Box, TextField, Button, Grid } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import avatar from '../assets/avatar.jpeg';
import { CreateUserInfo, createUser, googleSignin, parseLocalStorageData } from "./userService";
import {uploadFile} from './../File/FileService';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

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

  const navigate = useNavigate();

  const pickedImage = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  } 
/*
  const tempRegister = async () => {
    
    const response = await get(
      'http://127.0.0.1:3000/user'
    );
    const data = await response.data;
    console.log(JSON.stringify(response));
    console.log(JSON.stringify(data));
  }
*/
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

      createUser(newUser)

      navigate('/signin', { replace: true });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    try {
      const response = await googleSignin(credentialResponse);
      parseLocalStorageData(response);
      console.log(response);
    }
    catch(error) {
      console.log(error);
    }
    navigate('/',  { replace: true });
    
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
          <Typography component="h1" variant="h5" sx={{ marginBottom: 4, 
         }}>
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
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%', // Make it circular
                  objectFit: 'cover', // Preserve aspect ratio while filling the box
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
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
