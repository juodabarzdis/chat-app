import React from "react";
import styles from "./ChatContainer.module.scss";

const ChatContainer = (props) => {
  const { currentChat } = props;

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
      <div className={styles["chat-container__messages"]}></div>
      <div className={styles["chat-container__input"]}>
        <input type="text" placeholder="Type a message" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
