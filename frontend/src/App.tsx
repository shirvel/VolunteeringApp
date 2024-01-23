import { LoginWithGooglePage } from "./auth/loginWithGoogle";
import { GroupChat } from "./chat/GroupChat";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/chat" element={<GroupChat />}></Route>
				<Route path="/google_login" element={<LoginWithGooglePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
