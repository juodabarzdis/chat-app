import React from "react";
import styles from "./Messages.module.scss";
import classNames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { dateConvert } from "../../utils/dateConvert";

const Messages = (props) => {
  const { messages, currentUser, currentChat } = props;

  return (
    <div className={styles.messages}>
      {messages.map((message) => (
        <div
          className={
            message.sender === currentUser._id
              ? styles["message-wrapper--sent"]
              : styles["message-wrapper--received"]
          }
          key={uuidv4()}
        >
          <div className={styles["image-container"]}>
            <img
              className={styles["profile-image"]}
              src={
                message.sender === currentUser._id
                  ? currentUser.profilePicture
                  : currentChat.profilePicture
              }
              alt="Profile"
            />
            <p className={styles["message-time"]}>
              {/*need to fix this*/}
              {dateConvert(message.createdAt)}
            </p>
          </div>
          <div
            className={
              message.sender === currentUser._id
                ? styles["message--sent"]
                : styles["message--received"]
            }
          >
            <p>{message.message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
