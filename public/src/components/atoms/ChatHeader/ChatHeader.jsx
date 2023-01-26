import styles from "./ChatHeader.module.scss";

const ChatHeader = ({ currentChat, handleSelectedUser }) => {
  return (
    <div className={styles["chat-header"]}>
      <button
        className={styles["chat-header__avatar-button"]}
        onClick={() => handleSelectedUser(currentChat._id)}
      >
        <img
          src={currentChat.profilePicture}
          alt="Avatar"
          className={styles["chat-header__avatar"]}
        />
      </button>
      <p className={styles["chat-header__header"]}>
        {currentChat && currentChat.username}
      </p>
    </div>
  );
};

export default ChatHeader;
