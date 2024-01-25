import { GroupChat } from './chat/GroupChat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Sidebar from './components/sidebar';
import EditUser from './components/editUser';
import ViewPosts from './components/viewPosts';

export const App = () => {
  return (
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
  );
}

