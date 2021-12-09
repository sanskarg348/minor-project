import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import avatar from "../Images/avatar.png"

import "./Login.css";
import "./UserRegistration.css";
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
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      const uid = user.uid;
      db.collection("Users").doc(uid)
      .set({ name: credentials.name, chat: [] })
      .then(() => {
        history.push("/chat");
      })
      .catch((err) => {
        toast.error("ERROR");
      });
    })
  };
  return (
    <div className="admin-login-parent-div">
      <ToastContainer />
      <div className="admin-login-form-div-2">
      <img src={avatar} className="mini-icon"></img>

        <h4>Register</h4>
        <p>Enter your details below</p>
        <div className="admin-login-input-div">
          
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={credentials.name}
            onChange={handleChange}
            className="admin-login-input"
          ></input>
        </div>
        <button onClick={handleSignIn} className="admin-login-btn">
          Proceed
        </button>
      </div>
    </div>
  );
}
