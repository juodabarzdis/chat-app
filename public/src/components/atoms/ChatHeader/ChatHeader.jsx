import React from "react";
import styles from "./ChatHeader.module.scss";

const ChatHeader = ({ currentChat }) => {
  return (
    <div className={styles["chat-header"]}>
      <img
        src={currentChat.profilePicture}
        alt="Avatar"
        className={styles["chat-header__avatar"]}
      />
      <p className={styles["chat-header__header"]}>
        {currentChat && currentChat.username}
      </p>
    </div>
  );
};

export default ChatHeader;
