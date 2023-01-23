import React from "react";
import styles from "./Messages.module.scss";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";

const Messages = (props) => {
  const { messages, currentUser } = props;
  return (
    <div className={styles.messages}>
      {messages.map((message, i) => (
        <div
          key={uuidv4()}
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
