import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import styles from "./ChatContainer.module.scss";
import { addMessageRoute, getMessagesRoute } from "../../../utils/APIRoutes";
import { MainContext } from "../../../context/socketContext";

import MessageInput from "../../atoms/MessageInput";
import Messages from "../../molecules/Messages";
import ChatHeader from "../../atoms/ChatHeader";

const ChatContainer = (props) => {
  const { currentChat, currentUser, handleSelectedUser } = props;
  const [messages, setMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState(null);
  const { socket } = useContext(MainContext);

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
      <ChatHeader
        currentChat={currentChat}
        handleSelectedUser={handleSelectedUser}
      />
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
