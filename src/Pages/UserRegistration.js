import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";

import "./Login.css";
import { toast, ToastContainer } from "react-toastify";

export default function UserRegistration() {
  const [credentials, setCredentials] = useState({
    name: "",
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

  const handleSignIn = (event) => {
    event.preventDefault();
    db.collection("Users")
      .add({ name: credentials.name, chat: [] })
      .then(() => {
        history.push("/chat");
      })
      .catch((err) => {
        toast.error("ERROR");
      });
  };
  return (
    <div className="admin-login-parent-div">
      <ToastContainer />
      <div className="admin-login-form-div">
        <h4>Login To devNtech</h4>
        <p>Enter your login details below</p>
        <div className="admin-login-input-div">
          <label className="admin-login-input-label" for="email">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={credentials.name}
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
        <button onClick={handleSignIn} className="admin-login-btn">
          Login
        </button>
      </div>
    </div>
  );
}
