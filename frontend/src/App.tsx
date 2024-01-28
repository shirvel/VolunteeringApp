import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import ViewPosts from './Post/viewPosts';
import { Signup } from './User/Signup';
import { Signin } from './User/Signin';
import { EditUserDetails } from './User/EditUserDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Comment } from './Comments/comment';
import { ChatPage } from './chat/ChatPage';
import { Posts } from './Post/Posts';

export const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <div style={{ display: 'flex' }}>
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
                <Route path="/edit-user" element={<EditUserDetails />} />
                <Route path="/comment" element={<Comment />} />
                <Route path="/posts" element={<Posts />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
