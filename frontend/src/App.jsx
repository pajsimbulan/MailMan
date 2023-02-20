import React from "react";
import Mainpage from "./main/pages/Mainpage"
import Signinpage from "./signin/pages/Signinpage";
import Profilepage from "./profile/pages/Profilepage";
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {createContext} from 'react';

export const UserContext = createContext();
export default function App() {
    let accessToken = ' ';
    let userInfo = {
        firstName: undefined,
        email: undefined,
        createdAt: undefined,
        lastName: undefined,
        gender: undefined,
        birthDate: undefined,
    } ;
    return (
        <div>
            <UserContext.Provider value={{accessToken, userInfo}}>
                <BrowserRouter>
                    <Routes>
                        <Route exact="true" path="/" element={<Signinpage />}/>
                        <Route path="/main" element={<Mainpage />}/>
                        <Route path="/profile" element={<Profilepage />}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}