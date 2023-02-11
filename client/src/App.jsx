import React from "react";
import Mainpage from "./Mainpage"
import SignIn from "./Signinpage";
import Profilepage from "./Profilepage";
import Birthdatepicker from "./components/BirthDatePicker";
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
                        <Route exact="true" path="/" element={<Profilepage />}/>
                        <Route path="/main" element={<Mainpage />}/>
                        <Route path="/profile" element={<Profilepage />}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </div>
    )
}