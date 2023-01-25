import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import classNames from "classnames";
import styles from "./Chat.module.scss";
import { useNavigate } from "react-router-dom";
import { usersRoute } from "../../utils/APIRoutes";
import { SocketContext, SocketProvider } from "../../context/socketContext";
import Contacts from "../../components/molecules/Contacts";
import Welcome from "../../components/atoms/Welcome";
import ChatContainer from "../../components/organisms/ChatContainer";
import UserInfo from "../../components/molecules/UserInfo";
import Burger from "../../components/atoms/Burger";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const navigate = useNavigate();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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
    setOpenContacts(false);
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
            handleOpenInfo={handleOpenInfo}
          />
        </div>
        <div className={styles["chat-messages"]}>
          {currentChat ? (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              handleOpenInfo={handleOpenInfo}
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
