import googleButton from "../assets/google_signin_buttons/btn_google_signin_dark_pressed_web.png";

function navigate(url: string) {
	window.location.href = url;
}

async function auth() {
	const response = await fetch("http://127.0.0.1:3000/request", {
		method: "post",
	});

	const data = await response.json();
	console.log("My data is **** " + data.url);
	navigate(data.url);
}

export const LoginWithGooglePage = () => {
	return (
		<>
			<h1>Welcome to our volunteering app</h1>
			<h3>Google OAuth!</h3>

			<button className="btn-auth" type="button" onClick={() => auth()}>
				<img className="btn-auth-img" src={googleButton} alt="google sign in" />
			</button>
		</>
	);
};
