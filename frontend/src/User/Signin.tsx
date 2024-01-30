// Signin.tsx
import React, { useState } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { parseLocalStorageData } from "./userService";

const theme = createTheme();

export const Signin: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const navigate = useNavigate();

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

		// Rest of your login logic
		const user = {
			email,
			password,
		};

		try {
			const response = await fetch("http://127.0.0.1:3000/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const data = await response.json();
			parseLocalStorageData(data);
			navigate("/chat", { replace: true });
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
					<Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
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
						</form>
					</Box>
				</Container>
			</ThemeProvider>
		</div>
	);
};
