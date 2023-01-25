import { useState } from "react";
import styles from "./Contacts.module.scss";
import ContactsHeader from "../../atoms/ContactsHeader";
import ContactItem from "../../atoms/ContactItem";

const Contacts = ({ contacts, currentUser, chatChange, handleOpenInfo }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  contacts = contacts.filter((contact) => contact._id !== currentUser._id);

  const handleChatChange = (index, contact) => {
    setSelectedContact(index);
    chatChange(contact);
  };

  // const onlineClass = (id) =>
  //   classNames(styles["picture-container__status"], {
  //     [styles["picture-container__status--online"]]: onlineUsers.includes(id),
  //   });

  return (
    <div className={styles["contacts-container"]}>
      <ContactsHeader handleOpenInfo={handleOpenInfo} />
      {contacts.map((contact) => (
        <ContactItem
          selectedContact={selectedContact}
          contactId={contact._id}
          onClickHandler={() => handleChatChange(contact._id, contact)}
          profilePicture={contact.profilePicture}
          username={contact.username}
          key={contact._id}
        />
      ))}
    </div>
  );
};

export default Contacts;
