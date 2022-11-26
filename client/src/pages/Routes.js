import * as React from 'react'
import { Routes, Route } from "react-router";

import HomePage from "./HomePage"
import MainPage from "./MainPage"
import LoginState from "./LoginState"
import CreateAccount from "../components/CreateAccount/CreateAccount"
import MoreInfoCreate from "../components/CreateAccount/MoreInfoCreate"
import Login from "../components/Login/Login"
import ProfilePage from "./ProfilePage"
const Router = () => {
  const [loginStatus, setLoginState] = LoginState();

  console.log(loginStatus)

  return (
    <Routes>
      <Route exact path="/" element={(loginStatus) ? <MainPage loginStatus={loginStatus} setLoginState={setLoginState} /> : <HomePage setLoginState={setLoginState} /> } /> //Render either login page or main page depending on login status.
      <Route exact path="/profile/:id" element={<ProfilePage loginStatus={loginStatus} setLoginState={setLoginState} />} />
      <Route exact path="/CreateAccount" element={<CreateAccount />} />
      <Route exact path="/MoreInfoCreate" element={<MoreInfoCreate />} />
      <Route exact path="/Login" element={<Login />} />
    </Routes>
  );
}

export default Router;
