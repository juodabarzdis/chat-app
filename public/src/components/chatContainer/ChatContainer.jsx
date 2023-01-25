import { useState, useEffect } from "react";
import Axios from "axios";
import { addMessageRoute } from "../../utils/APIRoutes";
import styles from "./ChatContainer.module.scss";
import MessageInput from "../messageInput";
import Messages from "../messages";
import { getMessagesRoute } from "../../utils/APIRoutes";
import io from "socket.io-client";
import { dateConvert } from "../../utils/dateConvert";

import ChatHeader from "../atoms/ChatHeader";

const ChatContainer = (props) => {
  const { currentChat, currentUser } = props;
  const [messages, setMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState(null);

  const socket = io("http://localhost:5000");

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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
    }).catch((err) => {
      console.log(err);
    });

    socket.emit("send-message", {
      message: message,
      sender: currentUser._id,
      receiver: currentChat._id,
    });

    setMessages([
      ...messages,
      {
        message: { text: message },
        sender: currentUser._id,
        receiver: currentChat._id,
        createdAt: new Date(),
      },
    ]);
  };

  //setting an event listener for receiving messages
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setReceivedMessages({
        message: { text: data.message },
        sender: data.sender,
        receiver: data.receiver,
        createdAt: new Date(),
      });
    });
  }, []);

  useEffect(() => {
    if (receivedMessages) {
      setMessages([...messages, receivedMessages]);
    }
  }, [receivedMessages]);

  return (
    <div className={styles["chat-container"]}>
      <ChatHeader currentChat={currentChat} />
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
