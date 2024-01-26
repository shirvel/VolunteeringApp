// SignUp.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Signup: React.FC = () => {
  const [name, setName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>('');
  const [password, setPassword] = useState<string | null>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

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

    // Rest of your registration logic
    const newUser = {
      email: email,
      password: password,
      name: name,
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
      navigate('/chat', { replace: true });
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(to bottom, #ffffff, #d9d9d9)' }}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          {/* Sign Up Banner */}
          <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
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
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};
