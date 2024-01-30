import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<GoogleOAuthProvider clientId="1011222906796-79ou2d2vsjievbmp9nc64g9u96h0kcau.apps.googleusercontent.com">
	<React.StrictMode>
	   <App/>
	</React.StrictMode>,
	</GoogleOAuthProvider>
  )
