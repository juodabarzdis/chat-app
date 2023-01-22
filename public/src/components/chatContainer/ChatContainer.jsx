import { useState, useEffect } from "react";
import Axios from "axios";
import { addMessageRoute } from "../../utils/APIRoutes";
import styles from "./ChatContainer.module.scss";
import MessageInput from "../messageInput";
import Messages from "../messages";
import { getMessagesRoute } from "../../utils/APIRoutes";

const ChatContainer = (props) => {
  const { currentChat, currentUser, socket } = props;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentChat) {
      Axios.get(getMessagesRoute, {
        params: {
          sender: currentUser._id,
          receiver: currentChat._id,
        },
      })
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentChat]);

  const handleSendMessage = async (message) => {
    await Axios.post(addMessageRoute, {
      message: message,
      sender: currentUser._id,
      receiver: currentChat._id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-heading"]}>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Avatar"
          className={styles["chat-heading__avatar"]}
        />
        <p className={styles["chat-heading__header"]}>
          {currentChat && currentChat.username}
        </p>
      </div>
      <Messages
        messages={messages}
        currentChat={currentChat}
        currentUser={currentUser}
      />
      <MessageInput handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
