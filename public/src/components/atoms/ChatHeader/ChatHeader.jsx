import styles from "./ChatHeader.module.scss";
import EmptyAvatar from "../../../assets/empty-avatar.jpg";

const ChatHeader = ({ currentChat, handleSelectedUser }) => {
  return (
    <div className={styles["chat-header"]}>
      <button
        className={styles["chat-header__avatar-button"]}
        onClick={() => handleSelectedUser(currentChat._id)}
      >
        <img
          src={
            currentChat.profilePicture
              ? currentChat.profilePicture
              : EmptyAvatar
          }
          alt="Avatar"
          className={styles["chat-header__avatar"]}
        />
      </button>
      <p className={styles["chat-header__header"]}>
        {currentChat && currentChat.firstName + " " + currentChat.lastName}
      </p>
    </div>
  );
};

export default ChatHeader;
