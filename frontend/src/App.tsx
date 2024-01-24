import { GroupChat } from './chat/GroupChat';
import { Signup } from './User/Signup';
import { Signin } from './User/Signin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

export const App = () => {
        <Route path="/edit-user" element={<EditUserDetails />}></Route>
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/chat" element={<GroupChat />}>
        </Route>
        <Route path="/signup" element={<Signup />}>
        </Route>
        <Route path="/signin" element={<Signin />}>
        </Route>
        <Route path="/edit-user" element={<EditUserDetails />}></Route>
      </Routes>
    </BrowserRouter>
      
  );
}

