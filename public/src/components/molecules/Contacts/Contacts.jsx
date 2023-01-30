import { useState, useContext, useEffect } from "react";
import styles from "./Contacts.module.scss";
import { SocketContext } from "../../../context/socketContext";
import ContactsHeader from "../../atoms/ContactsHeader";
import ContactItem from "../../atoms/ContactItem";
import Button from "../../atoms/Button";

const Contacts = ({
  contacts,
  currentUser,
  chatChange,
  handleSelectedUser,
  setSelectedUser,
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
    setSelectedUser(contact);
  };

  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineContacts(users);
    });
  }, [socket]);

  const handleLogout = () => {
    localStorage.removeItem("chat-app-user");
    socket.on("disconnect", () => {
      socket.off();
    });

    window.location.reload();
  };

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
      <div className={styles["button-container"]}>
        <Button onClick={handleLogout} theme="text">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Contacts;
