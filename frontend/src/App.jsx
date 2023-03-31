import React, { createContext } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Signinpage from './signin/pages/Signinpage';
import Forgotpage from './signin/pages/Forgotpage';
import Signuppage from './signin/pages/Signuppage';
import Mainpage from './main/pages/Mainpage';
import Profilepage from './profile/pages/Profilepage';

export const UserContext = createContext();
export default function App() {
  const accessToken = ' ';
  const userInfo = {
    firstName: undefined,
    email: undefined,
    createdAt: undefined,
    lastName: undefined,
    gender: undefined,
    birthDate: undefined,
    avatar: undefined,
  };
  return (
    <div>
      <UserContext.Provider value={{ accessToken, userInfo }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>

            <Route exact="true" path="/" element={<Signinpage />} />
            <Route path="/forgot" element={<Forgotpage />} />
            <Route path="/signup" element={<Signuppage />} />
            <Route path="/main" element={<Mainpage />} />
            <Route path="/profile" element={<Profilepage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
