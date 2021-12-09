import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase";
import reportWebVitals from "./reportWebVitals";

const firebaseConfig = {
  apiKey: "AIzaSyAWBaMv-UPgU1R-wsBDrVrjmIi_3TYY-rI",
  authDomain: "minor-project-c98be.firebaseapp.com",
  projectId: "minor-project-c98be",
  storageBucket: "minor-project-c98be.appspot.com",
  messagingSenderId: "451934045304",
  appId: "1:451934045304:web:457e766a741b12165ed98d",
  measurementId: "${config.measurementId}",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
