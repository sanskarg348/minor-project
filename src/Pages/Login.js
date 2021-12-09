import React, { useState } from "react";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import avatar from "../Images/avatar.png"
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
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

  const handleSignIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        db.collection("Users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            if (snapshot) {
              const data = snapshot.data();
              if (snapshot.data()) {
                toast.success("successfully logged in");

                history.push("/chat");
              } else {
                history.push("/register");
              }
            }
          });
      })
      .catch((error) => {
        toast.error("Error : " + error.message);
      });
  };

  return (
    <div className="admin-login-parent-div">
      <ToastContainer />
      <div className="admin-login-form-div">
      <img src={avatar} className="mini-icon"></img>
        <h4>Login To Chat</h4>
        <p>Enter your login details below</p>
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
        <button onClick={handleSignIn} className="admin-login-btn">
          Login
        </button>
      </div>
    </div>
  );
}
