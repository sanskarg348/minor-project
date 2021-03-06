import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link, useHistory } from "react-router-dom";
import avatar from "../Images/avatar.png"


import "./Login.css";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const auth = firebase.auth();
  const db = firebase.firestore();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        if (uid) {
          toast.success("Successfully signed up");
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        } else {
          toast.error("Error");
        }
      });
  };

  return (
    <div className="admin-login-parent-div">
      <ToastContainer />
      <div className="admin-login-form-div">
      <img src={avatar} className="mini-icon"></img>
        <h4>Sign Up Here</h4>
        <p>Enter your details below</p>
        <div className="admin-login-input-div">
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-Mail"
            value={credentials.email}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
        <div className="admin-login-input-div">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
        <Form.Check
          type="checkbox"
          className="password-check"
          value={showPassword}
          onChange={() => {
            setShowPassword((prev) => !prev);
          }}
          label="Show Password"
        />
        <button onClick={handleSignUp} className="admin-login-btn">
          Sign Up
        </button>
        <p style={{marginTop: "12px", color: "rgba(0,0,0,0.650)", fontSize: "12px"}}>If you're an existing user, <Link to="/">Sign In</Link> instead</p>

      </div>
    </div>
  );
}
