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
<<<<<<< HEAD
  const [loginStatus, setLoginState] = LoginState();
=======
  const [loginStatus, setLoginState] = LoginState();  //Create hook

>>>>>>> 0739a74854c48e5990e93ada91b3d3ef33134f5d
  console.log(loginStatus)

  return (
    <Routes>
      <Route exact path="/" element={(loginStatus) ? <MainPage loginStatus={loginStatus} setLoginState={setLoginState} /> : <HomePage setLoginState={setLoginState} /> } /> //Render either login page or main page depending on login status.
      <Route exact path="/profile/:id" element={<ProfilePage loginStatus={loginStatus} setLoginState={setLoginState} />} />
      <Route exact path="/CreateAccount" element={<CreateAccount />} />
      <Route exact path="/MoreInfoCreate/:id" element={<MoreInfoCreate />} />
      <Route exact path="/Login" element={<Login />} />
    </Routes>
  );
}
// render={(props) => <MoreInfoCreate {...props} username={this.state.username}/>}
export default Router;
