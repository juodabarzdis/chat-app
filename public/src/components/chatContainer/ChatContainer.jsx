import React from "react";
import styles from "./ChatContainer.module.scss";
import Button from "../button";

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
      <div className={styles["chat-container__input-container"]}>
        <input
          className={styles["message-input"]}
          type="text"
          placeholder="Type a message"
        />
        <Button />
      </div>
    </div>
  );
};

export default ChatContainer;
