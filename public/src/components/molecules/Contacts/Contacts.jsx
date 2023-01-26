import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import styles from "./Contacts.module.scss";
import { SocketContext } from "../../../context/socketContext";
import ContactsHeader from "../../atoms/ContactsHeader";
import ContactItem from "../../atoms/ContactItem";

const Contacts = ({
  contacts,
  currentUser,
  chatChange,
  handleSelectedUser,
}) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [onlineContacts, setOnlineContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const socket = useContext(SocketContext);

  contacts = contacts.filter((contact) => contact._id !== currentUser._id);
  contacts = search.length > 0 ? searchResults : contacts;

  const handleChatChange = (index, contact) => {
    setSelectedContact(index);
    chatChange(contact);
  };

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineContacts(users);
    });
  }, [socket]);

  return (
    <div className={styles["contacts-container"]}>
      <ContactsHeader
        handleSelectedUser={handleSelectedUser}
        setSearchResults={setSearchResults}
        setSearch={setSearch}
        search={search}
      />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <ContactItem
              selectedContact={selectedContact}
              contactId={contact._id}
              onClickHandler={() => handleChatChange(contact._id, contact)}
              profilePicture={contact.profilePicture}
              username={contact.username}
              onlineContacts={onlineContacts}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
