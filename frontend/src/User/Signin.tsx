import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button, Link } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { parseLocalStorageData, signinUser } from "./userService";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

const theme = createTheme();

export const Signin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleSnackbarClose = () => {
		setErrorSnackbarOpen(false);
		setErrorMessage('');
	  };
	
	  const displayErrorSnackbar = (error: string) => {
		setErrorMessage(error);
		setErrorSnackbarOpen(true);
	  };

	const clickedLogin = async () => {
		// Check for empty fields
		if (!email) {
			setEmailError("Email is required");
			return;
		}

		if (!password) {
			setPasswordError("Password is required");
			return;
		}

		// Clear any previous error messages
		setEmailError(null);
		setPasswordError(null);

		const user = {
			email,
			password,
		};

		try {
			const response = await signinUser(user);

			if (response.status < 200 || response.status >= 400) {
				console.error('Error during login:', response.data);
				displayErrorSnackbar(`Error during login: ${response.data}. Please try again. `);
			  }
		
			  else {
				parseLocalStorageData(response.data);
				navigate('/view-posts', { replace: true });
		
			  }
		} catch (error) {
			console.error("Error during login:", error);	
		}
	};

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
					{/* Sign In Banner */}
					<Typography
						component="h1"
						variant="h5"
						sx={{
						marginBottom: 6,
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
							Sign In
						</Typography>

					{/* Signin Form */}
					<Box
						sx={{
							background: "white",
							borderRadius: 4,
							padding: 3,
							boxShadow: 2,
							width: "100%",
							boxSizing: "border-box",
						}}>
						<form>
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
								sx={{ marginTop: 2, background: "#2196f3", color: "white" }}
								onClick={clickedLogin}>
								Log In
							</Button>

							<Typography
							variant="body2"
							color="textSecondary"
							sx={{ marginTop: 3, textAlign: "center" }}
						>
							Don't have an account yet?{" "}

							<Link
							component="button"
							variant="body2"
							 onClick={() => {
							 	navigate("/signup", {replace: true});
							 }}
							sx={{ fontWeight: "bold", cursor: "pointer" }}
							>
							Sign up
							</Link>
							</Typography>

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

						</form>
					</Box>
				</Container>
			</ThemeProvider>
		</div>
	);
};
