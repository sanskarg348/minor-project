import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./Chat.css";
import { toast } from "react-toastify";
import avatar from "../Images/avatar.png"

export default function Chat() {
  const db = firebase.firestore();
  const auth = firebase.auth();
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

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
        .then(async (snapshot) => {
          const nm = snapshot.data().name;
          setName(nm);
          const chats = snapshot.data().chat;
          setMessages(chats); 
          const chatbox = new Chatbox(chats);
          chatbox.display(); 
        })
        .catch((error) => {
          toast.error("ERROR");
        });
    });
  };
  class Chatbox {
    constructor(messagess) {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }
        this.state = false;
        this.messages = messagess;
        console.log(messagess);
        this.updateChatText(this.args.chatBox);

    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "divyanshu", message: text1};
        addMessage(text1, "divyanshu");
        this.messages.push(msg1);

        fetch(
          "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
          {
            method: "POST",
            body: JSON.stringify({
              inputs: {
                text: text1,
              },
            }),
            mode: "cors",
            headers: {
              Authorization: "Bearer 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",
            },
          }
        )
          .then((r) => r.json())
          .then((r) => {
            let msg2 = {name: 'Sam', message: r.generated_text};
            addMessage(r.generated_text, 'Sam');
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = "";
          })
          .catch((error) => {
            console.error("Error:", error);
            this.updateChatText(chatbox);
            textField.value = "";
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam" || item.sender == 'Sam')
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });
        console.log(chatbox)
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}




  const addMessage = ((message, sender) => {
      auth.onAuthStateChanged((user) => {
          const uid = user.uid;
          db.collection("Users").doc(uid).update({
              chat: firebase.firestore.FieldValue.arrayUnion({message, sender})
          }).then(() => {
                console.log("Message Added");
          }).catch(err => {
              toast.error("ERROR");
              console.log("Error");
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
            <span class="sub-text">Frends with {name && name}</span>
            <br />
          </div>
          <div class="avatar">
            <img src={avatar} />
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
