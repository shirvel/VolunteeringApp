// import { GroupChat } from './chat/GroupChat';
import googleButton from './assets/google_signin_buttons/btn_google_signin_dark_pressed_web.png';
import './App';
import React from 'react'

// export const App = () => {
//   return (
//       <GroupChat/>
//   );
// }

function App() {

  function navigate(url: string) {
      window.location.href = url;
  }

  async function auth() {
      const response = await fetch('http://127.0.0.1:3000/request',
      {method:'post'});
      const data = await response.json();
      navigate(data.url);
  }
  return (
      <>
      <h1>
          Welcome to our volunteering App!
      </h1>

      <h3>
          Google OAuth!
      </h3>   

      <button type="button" onClick={()=> auth()}>

          <img src={googleButton} alt="Google sign in"/>
      </button>

      </>
  )
}

export default App;