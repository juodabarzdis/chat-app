import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { logoutRoute } from "../../../utils/APIRoutes";
import styles from "./Contacts.module.scss";
import { MainContext } from "../../../context/socketContext";
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
  const { socket, setCurrentUser } = useContext(MainContext);

  contacts = contacts.filter((contact) => contact._id !== currentUser.id);
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
    Axios.get(logoutRoute, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setCurrentUser(null);
      })
      .catch((err) => {
        console.log(err);
      });

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
        currentUser={currentUser}
        setSearch={setSearch}
        search={search}
      />
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <ContactItem
              selectedContact={selectedContact}
              contact={contact}
              onClickHandler={() => handleChatChange(contact._id, contact)}
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
