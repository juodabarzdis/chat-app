import { useState } from "react";
import Button from "../button";
import styles from "./MessageInput.module.scss";
import { BsEmojiSmile } from "react-icons/bs";

const MessageInput = (props) => {
  const [message, setMessage] = useState("");
  const { handleSendMessage } = props;

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className={styles["message-container"]} onSubmit={sendMessage}>
      <input
        className={styles["message-container__input"]}
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <BsEmojiSmile className={styles["message-container__emoji"]} />
      <Button icon="send" size="medium" />
    </form>
  );
};

export default MessageInput;
