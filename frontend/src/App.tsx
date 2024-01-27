import React from "react";
import Sidebar from "./components/sidebar";
import ViewPosts from "./components/viewPosts";
import { Signup } from "./User/Signup";
import { Signin } from "./User/Signin";
import { EditUserDetails } from "./User/EditUserDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Comment } from "./Comments/comment";
import { ChatPage } from "./chat/ChatPage";
import { Posts } from "./Post/Posts";
import { AllPostComments } from "./Comments/allPostComments";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/Signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />}></Route>
				<Route
					path="/*"
					element={
						<div style={{ display: "flex" }}>
							<Sidebar />
							<Routes>
								<Route path="/chat" element={<ChatPage />} />
								<Route path="/view-posts" element={<ViewPosts />} />
								<Route path="/edit-user" element={<EditUserDetails />} />
								<Route path="/comment" element={<Comment />}></Route>
								<Route path="/posts" element={<Posts />}></Route>
								<Route path="/comments" element={<AllPostComments />}></Route>
							</Routes>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};
