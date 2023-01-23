import { useState } from "react";
import styles from "./Contacts.module.scss";
import classNames from "classnames";

import ContactsHeading from "../atoms";

const Contacts = ({ contacts, currentUser, chatChange }) => {
  const [currentSelected, setCurrentSelected] = useState(null);

  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    chatChange(contact);
  };

  const selectedClass = (id) =>
    classNames(styles.contact, {
      [styles["contact--selected"]]: id === currentSelected,
    });

  return (
    <div className={styles["contacts-container"]}>
      <ContactsHeading />
      {contacts.map((contact) => (
        <div
          className={selectedClass(contact._id)}
          key={contact._id}
          onClick={() => handleChatChange(contact._id, contact)}
        >
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="Avatar"
            className={styles["contact__avatar"]}
          />
          <p className={styles["contact__name"]}>{contact.username}</p>
        </div>
      ))}
      <div className={styles["contact"]}>
        {currentUser && <p>{currentUser.username}</p>}
      </div>
    </div>
  );
};

export default Contacts;
