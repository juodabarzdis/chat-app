import React from "react";
import styles from "./Messages.module.scss";
import classNames from "classnames";

const Messages = (props) => {
  const { messages, currentUser } = props;

  console.log(messages);

  return (
    <div className={styles.messages}>
      {messages.map((message, i) => (
        <div
          key={i * Math.floor(Math.random() * 100)}
          className={
            message.sender === currentUser._id
              ? styles["message--sent"]
              : styles["message--received"]
          }
        >
          <p>{message.message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
