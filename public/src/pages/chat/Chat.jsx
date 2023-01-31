import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import classNames from "classnames";
import styles from "./Chat.module.scss";
import { useNavigate } from "react-router-dom";
import { usersRoute } from "../../utils/APIRoutes";
import { MainContext } from "../../context/MainContext";
import Contacts from "../../components/molecules/Contacts";
import Welcome from "../../components/atoms/Welcome";
import ChatContainer from "../../components/organisms/ChatContainer";
import UserInfo from "../../components/molecules/UserInfo";
import Burger from "../../components/atoms/Burger";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const { socket, currentUser, setCurrentUser } = useContext(MainContext);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }

    if (!currentChat) {
      setSelectedUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      Axios.get(usersRoute)
        .then((res) => {
          setContacts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  const handlechatChange = (chat) => {
    setCurrentChat(chat);
    setOpenContacts(false);
  };

  const handleSelectedUser = (id) => {
    setOpenInfo(!openInfo);
    if (id) {
      const user = contacts.find((contact) => contact._id === id);
      return setSelectedUser(user);
    }
  };

  const handleInfo = () => {
    setOpenInfo(!openInfo);
  };

  const handleOpenContacts = () => {
    setOpenContacts(!openContacts);
  };

  const cl = classNames(styles["chat-info"], {
    [styles["chat-info--open"]]: openInfo,
  });

  const pl = classNames(styles["chat-contacts"], {
    [styles["chat-contacts--open"]]: openContacts,
  });

  return (
    <section className={styles["chat-section"]}>
      <div className={styles["chat-container"]}>
        <div className={styles["chat-container__burger"]}>
          <Burger
            handleOpenContacts={handleOpenContacts}
            openContacts={openContacts}
          />
        </div>
        <div className={pl}>
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            chatChange={handlechatChange}
            handleInfo={handleInfo}
            handleSelectedUser={handleSelectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
        <div className={styles["chat-messages"]}>
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              handleSelectedUser={handleSelectedUser}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
        <div className={cl}>
          <UserInfo selectedUser={selectedUser} handleInfo={handleInfo} />
        </div>
      </div>
    </section>
  );
};

export default Chat;
