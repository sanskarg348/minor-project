import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";

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
        <h4>Sign Up To devNtech</h4>
        <p>Enter your login details below</p>
        <div className="admin-login-input-div">
          <label className="admin-login-input-label" for="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
        <div className="admin-login-input-div">
          <label className="admin-login-input-label" for="email">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
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
      </div>
    </div>
  );
}
