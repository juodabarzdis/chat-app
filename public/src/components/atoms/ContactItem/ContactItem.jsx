import React from "react";
import styles from "./ContactItem.module.scss";
import classNames from "classnames";

const ContactItem = (props) => {
  const {
    selectedContact,
    contactId,
    onClickHandler,
    profilePicture,
    username,
    onlineContacts,
  } = props;

  const selectedClass = (id) =>
    classNames(styles.contact, {
      [styles["contact--selected"]]: id === selectedContact,
    });

  const onlineClass = (id) =>
    classNames(styles["picture-container__status"], {
      [styles["picture-container__status--online"]]:
        onlineContacts.includes(id),
    });

  return (
    <div className={selectedClass(contactId)} onClick={onClickHandler}>
      <div className={styles["picture-container"]}>
        <img
          src={profilePicture}
          alt="Avatar"
          className={styles["picture-container__avatar"]}
        />
        <div className={onlineClass(contactId)}></div>
      </div>
      <p className={styles["contact__name"]}>{username}</p>
    </div>
  );
};

export default ContactItem;
