import React from "react";
import styles from "./UserInfo.module.scss";
import EmptyAvatar from "../../../assets/empty-avatar.jpg";
import {
  FaMapMarkedAlt,
  FaMobileAlt,
  FaRegEnvelope,
  FaArrowLeft,
} from "react-icons/fa";

const UserInfo = ({ selectedUser, handleInfo }) => {
  console.log(selectedUser);
  return (
    <div className={styles["info-container"]}>
      <div className={styles["info-container__return"]} onClick={handleInfo}>
        <FaArrowLeft />
      </div>
      <div className={styles["info-container__header"]}>
        <img
          src={
            selectedUser?.profilePicture
              ? selectedUser.profilePicture
              : EmptyAvatar
          }
          alt="Profile"
        />
        <h3>
          {selectedUser && selectedUser.firstName + " " + selectedUser.lastName}
        </h3>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className={styles.contacts}>
        <div className={styles["contacts__item"]}>
          <FaMapMarkedAlt />
          <p>{selectedUser?.location ? selectedUser.location : "Lithuania"}</p>
        </div>
        <div className={styles["contacts__item"]}>
          <FaMobileAlt />
          <p>{selectedUser?.phone ? selectedUser.phone : "123456789"}</p>
        </div>
        <div className={styles["contacts__item"]}>
          <FaRegEnvelope />
          <p>{selectedUser?.email ? selectedUser.email : "email@mail.com"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
