import React from "react";
import Mainpage from "./Mainpage"
import SignIn from "./Signinpage";
import SignUp from "./Signuppage";
import {Route, Routes, BrowserRouter} from 'react-router-dom';
export default function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact="true" path="/" element={<SignIn />}/>
                    <Route path="/main" element={<Mainpage />}/>
                    <Route path="/signup" element={<SignUp />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}