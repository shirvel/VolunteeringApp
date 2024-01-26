import { GroupChat } from './chat/GroupChat';
import React , { useState } from 'react';
import Sidebar from './components/sidebar';
import ViewPosts from './components/viewPosts';
import { Signup } from "./User/Signup";
import { Signin } from "./User/Signin";
import { EditUserDetails } from "./User/EditUserDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const App = () => {
  return (
/*    
    //<BrowserRouter>
    //<Routes>
      //  <Route path="/chat" element={<GroupChat />}>
        //</Route>
      //</Routes>
    //</BrowserRouter>
    <Router>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Sidebar />
        <Routes> 
          <Route path="/edit-user" element={<EditUser />} /> 
          <Route path="/chat" element={<GroupChat />} /> 
          <Route path="/view-posts" element={<ViewPosts />} /> 
        </Routes>
      </div>
    </Router>
    
    <BrowserRouter>
			<Routes>
				<Route path="/signup" element={<Signup />}></Route>
				<Route path="/signin" element={<Signin />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
			</Routes>
		</BrowserRouter>
    */
    <BrowserRouter>
      <Routes>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/*"
          element={
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <Routes>
                <Route path="/chat" element={<GroupChat />} />
                <Route path="/view-posts" element={<ViewPosts />} />
                <Route path="/edit-user" element={<EditUserDetails />} />
              </Routes>
            </div>
          }
        />
      </Routes>

    </BrowserRouter>
    );
  };
    

