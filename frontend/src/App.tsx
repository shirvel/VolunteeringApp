import { GroupChat } from "./chat/GroupChat";
import { Comment } from "./Comments/comment";
import { Signup } from "./User/Signup";
import { Signin } from "./User/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { EditUserDetails } from "./User/EditUserDetails";
import { Posts } from "./Post/Posts";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/chat" element={<GroupChat />}></Route>
				<Route path="/signup" element={<Signup />}></Route>
				<Route path="/signin" element={<Signin />}></Route>
				<Route path="/edit-user" element={<EditUserDetails />}></Route>
				<Route path="/comment" element={<Comment />}></Route>
				<Route path="/posts" element={<Posts />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
