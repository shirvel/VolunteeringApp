import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import ViewListIcon from "@mui/icons-material/ViewList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CreatePostModal } from "../Post/CreatePostModal";
import { EditUserDetailsModal } from "../User/EditUserDetailsModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";


function Sidebar() {
	const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false); // State for dialog visibility
	const [isEditUserDialogOpen, setEditUserDialogOpen] = useState(false);
	const [isMainButtonVisible, setMainButtonVisible] = useState(true);
	const [areOtherButtonsVisible, setOtherButtonsVisible] = useState(false);

	// Function to open the Create Post dialog
	const openCreatePostDialog = () => {
		setCreatePostDialogOpen(true);
	};

	// Function to close the Create Post dialog
	const closeCreatePostDialog = () => {
		setCreatePostDialogOpen(false);
	};

	return (
		<div className="sidebar-container">
			<div className="sidebar">
				<h1 className="option-title">Choose Your Option</h1>
				<nav>
					<ul>
						{isMainButtonVisible && (
							<li className="button-list-item">
								{/* Show the Main button */}
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
									<Link
										to="/posts"
										className="button-link"
										onClick={() => openCreatePostDialog()}>
										<AddCircleOutlineIcon /> Create Post
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

			{/* Pass the dialog state to CreatePostModal */}
			<CreatePostModal
				open={isCreatePostDialogOpen}
				onClose={closeCreatePostDialog}
			/>
		</div>
	);
}

export default Sidebar;
