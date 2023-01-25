import React from "react";
import styles from "./UserInfo.module.scss";
import {
  FaMapMarkedAlt,
  FaMobileAlt,
  FaRegEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

const UserInfo = ({ currentChat, handleOpenInfo, currentUser }) => {
  return (
    <div className={styles["info-container"]}>
      <div
        className={styles["info-container__return"]}
        onClick={handleOpenInfo}
      >
        <FaArrowLeft />
      </div>
      <div className={styles["info-container__header"]}>
        <img
          src={
            currentChat
              ? currentChat.profilePicture
              : currentUser?.profilePicture
          }
          alt="Profile"
        />
        <h3>{currentChat ? currentChat.username : currentUser?.username}</h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className={styles.contacts}>
        <div className={styles["contacts__item"]}>
          <FaMapMarkedAlt />
          <p>{currentChat?.location ? currentChat.location : "Lithuania"}</p>
        </div>
        <div className={styles["contacts__item"]}>
          <FaMobileAlt />
          <p>{currentChat?.phone ? currentChat.phone : "123456789"}</p>
        </div>
        <div className={styles["contacts__item"]}>
          <FaRegEnvelope />
          <p>{currentChat?.email ? currentChat.email : "email@mail.com"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
