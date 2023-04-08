import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function Login() {
  return (
    <div className="bg-black1 signup_wrapper">
      <Tabs defaultActiveKey="home" id="justify-tab-example" justify>
        <Tab eventKey="home" title="Sign In">
          <SignIn />
        </Tab>
        <Tab eventKey="profile" title="Sign Up">
          <SignUp />
        </Tab>
      </Tabs>
    </div>
  );
}

export default Login;
