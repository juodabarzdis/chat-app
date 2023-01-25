import { useState, useEffect } from "react";
import styles from "./Contacts.module.scss";
import classNames from "classnames";
import ContactsHeader from "../atoms/ContactsHeader";

const Contacts = ({ contacts, currentUser, chatChange, handleOpenInfo }) => {
  const [currentSelected, setCurrentSelected] = useState(null);

  const handleChatChange = (index, contact) => {
    setCurrentSelected(index);
    chatChange(contact);
  };

  const selectedClass = (id) =>
    classNames(styles.contact, {
      [styles["contact--selected"]]: id === currentSelected,
    });

  // const onlineClass = (id) =>
  //   classNames(styles["picture-container__status"], {
  //     [styles["picture-container__status--online"]]: onlineUsers.includes(id),
  //   });

  return (
    <div className={styles["contacts-container"]}>
      <ContactsHeader handleOpenInfo={handleOpenInfo} />
      {contacts.map((contact) => (
        <div
          className={selectedClass(contact._id)}
          key={contact._id}
          onClick={() => handleChatChange(contact._id, contact)}
        >
          <div className={styles["picture-container"]}>
            <img
              src={contact.profilePicture}
              alt="Avatar"
              className={styles["picture-container__avatar"]}
            />
            <div className={styles["picture-container__status"]}></div>
          </div>
          <p className={styles["contact__name"]}>{contact.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
