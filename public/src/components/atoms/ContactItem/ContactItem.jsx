import React from "react";
import styles from "./ContactItem.module.scss";
import classNames from "classnames";
import EmptyAvatar from "../../../assets/empty-avatar.jpg";

const ContactItem = (props) => {
  const { selectedContact, contact, onClickHandler, onlineContacts } = props;

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
    <div className={selectedClass(contact._id)} onClick={onClickHandler}>
      <div className={styles["picture-container"]}>
        <img
          src={contact.profilePicture ? contact.profilePicture : EmptyAvatar}
          alt="Avatar"
          className={styles["picture-container__avatar"]}
        />
        <div className={onlineClass(contact._id)}></div>
      </div>
      <p className={styles["contact__name"]}>
        {contact.firstName + " " + contact.lastName}
      </p>
    </div>
  );
};

export default ContactItem;
