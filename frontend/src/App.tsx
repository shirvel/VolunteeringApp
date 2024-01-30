import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import ViewPosts from "./Post/viewPosts";
import { Signup } from "./User/Signup";
import { Signin } from "./User/Signin";
import { UserDetailsComp } from "./User/UserDetailsComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatPage } from "./chat/ChatPage";
import { Posts } from "./Post/Posts";
import { AllPostComments } from "./Comments/allPostComments";

export const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/Signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/*"
					element={
						<div
							style={{
								display: "flex",
								minHeight: "100vh",
								minWidth: "100wh",
							}}>
							<Sidebar />
							<Routes>
								<Route path="/chat" element={<ChatPage />} />
								<Route
									path="/view-posts"
									element={
										<ViewPosts
											isSidebarOpen={isSidebarOpen}
											toggleSidebar={toggleSidebar}
										/>
									}
								/>
								<Route path="/user-details" element={<UserDetailsComp />} />
								<Route path="/comments" element={<AllPostComments />}></Route>
								<Route path="/posts" element={<Posts />} />
							</Routes>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
