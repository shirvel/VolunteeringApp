// Signin.tsx
import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Signin: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const clickedLogin = async () => {
    const user = {
      "email": email,
      "password": password,
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(JSON.stringify(data));
      navigate('/chat', { replace: true });
    } catch (error) {
      console.log(error)
      console.error('Error during registration:', JSON.stringify(error));
    }
  };

  return (
      <div style={{background: 'linear-gradient(to bottom, #ffffff, #d9d9d9)'}}> 
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
        {/* Sign In Banner */}
        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
          Sign In
        </Typography>

        {/* Signin Form */}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ marginTop: 2, background: '#2196f3', color: 'white' }}
              onClick={clickedLogin}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
      
      
      </div>
    
  );
};