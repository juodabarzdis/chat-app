import { useState } from "react";
import styles from "./Contacts.module.scss";
import classNames from "classnames";

import ContactsHeader from "../atoms/ContactsHeader";

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

  console.log(contacts);

  return (
    <div className={styles["contacts-container"]}>
      <ContactsHeader />
      {contacts.map((contact) => (
        <div
          className={selectedClass(contact._id)}
          key={contact._id}
          onClick={() => handleChatChange(contact._id, contact)}
        >
          <img
            src={contact.profilePicture}
            alt="Avatar"
            className={styles["contact__avatar"]}
          />
          <p className={styles["contact__name"]}>{contact.username}</p>
        </div>
      ))}
      {/* <div className={styles["contact"]}>
        {currentUser && <p>{currentUser.username}</p>}
      </div> */}
    </div>
  );
};

export default Contacts;
