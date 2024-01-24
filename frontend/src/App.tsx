import { EditUserDetails } from "./User/EditUserDetails";
import { GroupChat } from "./chat/GroupChat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/chat" element={<GroupChat />}></Route>
				<Route path="/edit-user" element={<EditUserDetails />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
