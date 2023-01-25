import { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.scss";
import Axios from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { usersRoute } from "../../utils/APIRoutes";
import Contacts from "../../components/molecules/contacts";
import Welcome from "../../components/atoms/welcome";
import ChatContainer from "../../components/organisms/chatContainer";
import UserInfo from "../../components/molecules/UserInfo";
import Burger from "../../components/atoms/Burger";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUser(user);
    }
  }, [navigate]);

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
  }, [currentUser]);

  const handlechatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleOpenInfo = () => {
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
          <Burger handleOpenContacts={handleOpenContacts} />
        </div>
        <div className={pl}>
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            chatChange={handlechatChange}
            handleOpenInfo={handleOpenInfo}
          />
        </div>
        <div className={styles["chat-messages"]}>
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
            />
          ) : (
            <Welcome currentUser={currentUser} />
          )}
        </div>
        <div className={cl}>
          <UserInfo
            currentChat={currentChat}
            currentUser={currentUser}
            handleOpenInfo={handleOpenInfo}
          />
        </div>
      </div>
    </section>
  );
};

export default Chat;
