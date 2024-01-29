import React, { useState } from 'react';
import ButtonAppBar from './components/appbar';
import './components/sidebar.css';
import  ViewPosts  from './Post/viewPosts';
import { Signup } from './User/Signup';
import { Signin } from './User/Signin';
import { EditUserDetails } from './User/EditUserDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Comment } from './Comments/comment';
import { ChatPage } from './chat/ChatPage';
import { Posts } from './Post/Posts';
import TemporaryDrawer  from './components/sidebar';
import { GroupChat } from './chat/GroupChat';

export const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
/*
  return (
    <div className='App'>
      <div className='app-bar'>
        <ButtonAppBar />
      </div>
    </div>
  );
*/
  return (
    <BrowserRouter>
      <div className='App'>
      <ButtonAppBar></ButtonAppBar>
      <Routes>
        <Route path="/Login" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/chat" element={<GroupChat />}></Route>
        <Route path="/view-posts" element={<ViewPosts isSidebarOpen={false} toggleSidebar={() => {}} />}></Route>
        <Route path="/edit-user" element={<EditUserDetails />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
};
