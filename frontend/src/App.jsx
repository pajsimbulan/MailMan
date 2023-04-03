import React, { createContext } from 'react';
import { Route, Routes, BrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CssBaseline from '@mui/material/CssBaseline';
import Signinpage from './signin/pages/Signinpage';
import Forgotpage from './signin/pages/Forgotpage';
import Signuppage from './signin/pages/Signuppage';
import Mainpage from './main/pages/Mainpage';
import Profilepage from './profile/pages/Profilepage';
import Greet from './greet/Greetpage';
import UhOh from './uh_oh/UhOhpage';
import './App.css'; 

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
          <AnimatedRoutes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={500} // Duration of the animation in milliseconds
        classNames="fade" // CSS class prefix for the animation
      >
        <RoutesSwitch />
      </CSSTransition>
    </TransitionGroup>
  );
}

function RoutesSwitch() {
  return (
    <Routes>
      <Route index path="/" element={<Signinpage />} />
      <Route path="/greet" element={<Greet />} />
      <Route path="/forgot" element={<Forgotpage />} />
      <Route path="/signup" element={<Signuppage />} />
      <Route path="/main" element={<Mainpage />} />
      <Route path="/profile" element={<Profilepage />} />
      <Route path="/uhoh" element={<UhOh />} />
      <Route path="*" element={<Signinpage />} />
    </Routes>
  );
}
