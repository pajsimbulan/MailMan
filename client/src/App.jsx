import React from "react";
import Mainpage from "./Mainpage"
import SignIn from "./Signinpage";
import SignUp from "./Signuppage";
import Profilepage from "./Profilepage";
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {createContext} from 'react';

export const UserContext = createContext();
export default function App() {
    let accessToken = ' ';
    let userInfo = ' ';
    return (
        <div>
            <UserContext.Provider value={{accessToken, userInfo}}>
                <BrowserRouter>
                    <Routes>
                        <Route exact="true" path="/" element={<SignIn />}/>
                        <Route path="/main" element={<Mainpage />}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/profile" element={<Profilepage />}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}