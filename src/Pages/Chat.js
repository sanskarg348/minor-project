import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./Chat.css";
import { toast } from "react-toastify";

export default function Chat() {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      getChat();
  }, [])

  const getChat = () => {
    setMessages([]);
    auth.onAuthStateChanged((user) => {
      const uid = user.uid;
      db.collection("Users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          const chats = snapshot.data().chat;
          setMessages(chats);
        })
        .catch((error) => {
          toast.error("ERROR");
        });
    });
  };

  const addMessage = ((message, sender) => {
      auth.onAuthStateChanged((user) => {
          const uid = user.uid;
          db.collection("Users").doc(uid).update({
              chat: firebase.firestore.FieldValue.arrayUnion({message, sender})
          }).then(() => {
                setMessages((prev) => {
                    return [...prev, {sender: sender, message: message}]
                })
          }).catch(err => {
              toast.error("ERROR");
          })
      })
  })

  return (
    <div>
      <div class="chat-main-container">
        <div class="right-side">
          <div class="details">
            <span class="name">Sam</span>
            <br />
            <br />
            <span class="sub-details">LVL 4 | 555 XP | Chatty</span>
            <br />
            <span class="sub-text">Frends with DIVYANSHU SHARMA</span>
            <br />
          </div>
          <div class="avatar">
            <img src="./images/avatar.png" />
          </div>
          <div class="btn-down">
            <a class="link" href="">
              RESTART CONVERSATION
            </a>
          </div>
        </div>
        <div class="chatbox">
          <div class="chatbox__support chatbox--active">
            <div class="chatbox__header">
              <div class="chatbox__image--header">
                <img
                  src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                  alt="something"
                />
              </div>
              <div class="chatbox__content--header">
                <h4 class="chatbox__heading--header">SAM</h4>
                <p class="chatbox__description--header">
                  Hi. My name is Sam. How can I help you?
                </p>
              </div>
            </div>{" "}
            -->
            <div class="chatbox__messages">
              <div class="inner_msg"></div>
            </div>
            <div class="chatbox__footer">
              <input type="text" placeholder="Write a message..." />
              <button class="chatbox__send--footer send__button">Send</button>
            </div>
          </div>
          <div class="chatbox__button">
            <button>
              <img src="./images/chatbox-icon.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
