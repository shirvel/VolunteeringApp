import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import ViewPosts  from "./Post/viewPosts";
import { Signup } from "./User/Signup";
import { Signin } from "./User/Signin";
import { UserDetailsComp } from "./User/UserDetailsComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatPage } from "./chat/ChatPage";
import { Posts } from "./Post/Posts-deprecated";
import { AllPostComments } from "./Comments/allPostComments";
import { Navigate } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import LayoutWithSidebar from './components/layot';


export const App = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};
	const handleLogin = () => {
        setIsAuthenticated(true);
        // additional login logic...
    };


	return (
		<BrowserRouter>
		<Routes>
			<Route path="/Signin" element={<Signin />} />
			<Route path="/Signup" element={<Signup />} />
			{/* ... other routes like signup, etc. ... */}

			{/* Use LayoutWithSidebar as a wrapper for your main routes */}
			<Route element={<LayoutWithSidebar />}>
				<Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
					<Route path="/chat" element={<ChatPage/>} />
					<Route path="/user-details" element={<UserDetailsComp/>} />
					<Route path="/comments" element={<AllPostComments/>} />
					<Route path="/posts" element={<Posts />} />
					<Route path="/" element={
										<ViewPosts
											isSidebarOpen={isSidebarOpen}
											toggleSidebar={toggleSidebar}
										/>
									}
							  />
					<Route path="/view-posts" element={
										<ViewPosts
											isSidebarOpen={isSidebarOpen}
											toggleSidebar={toggleSidebar}
										/>
									}
							  />
					{/* other protected routes */}
				</Route>
				{/* ... other routes that should show the sidebar ... */}
			</Route>
		</Routes>
	</BrowserRouter>
		/*
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
		*/
	);
	
};
