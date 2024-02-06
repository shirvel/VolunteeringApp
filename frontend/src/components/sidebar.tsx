import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import ViewListIcon from "@mui/icons-material/ViewList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useNavigate } from "react-router-dom";
import { getConnectedUser } from "../User/userService";

function Sidebar() {
	const [isMainButtonVisible, setMainButtonVisible] = useState(true);
	const [areOtherButtonsVisible, setOtherButtonsVisible] = useState(false);

	const navigate = useNavigate();

	// Check if the user is connected (logged in) and redirect if not
	const checkUserConnected = async () => {
		const userDetails = await getConnectedUser();
		if (!userDetails) {
			navigate("/signin"); // Redirect to the signin page
		}
	};

	useEffect(() => {
		checkUserConnected();
	}, []);

	return (
		<div className="sidebar-container">
			<div className="sidebar">
				<h1 className="option-title">Choose Your Option</h1>
				<nav>
					<ul>
						{isMainButtonVisible && (
							<li className="button-list-item">
								<button
									className="button-link main-button"
									onClick={() => {
										setMainButtonVisible(false);
										setOtherButtonsVisible(true);
									}}>
									<HomeIcon /> Main
								</button>
							</li>
						)}
						{areOtherButtonsVisible && (
							<>
								<li>
									{/* Show the Chat button */}
									<Link to="/chat" className="button-link">
										<ChatIcon /> Chat
									</Link>
								</li>
								<li>
									{/* Show the View Posts button */}
									<Link to="/view-posts" className="button-link">
										<ViewListIcon /> View Posts
									</Link>
								</li>
								<li>
									<Link to="/user-details" className="button-link">
										<ManageAccountsIcon /> Your details
									</Link>
								</li>
								<li>
									<Link
										to="/signin"
										className="button-link"
										onClick={() => localStorage.clear()}>
										<LogoutIcon /> Logout
									</Link>
								</li>
							</>
						)}
					</ul>
				</nav>
			</div>
			{!isMainButtonVisible && (
				<button
					className="button-link back-button"
					onClick={() => {
						setMainButtonVisible(true);
						setOtherButtonsVisible(false);
					}}>
					<ArrowBackIcon /> Back
				</button>
			)}
		</div>
	);
}

export default Sidebar;
