import { useState, useEffect } from "react";
import styles from "./Chat.module.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { contactsRoute } from "../../utils/APIRoutes";
import Contacts from "../../components/contacts";
import Welcome from "../../components/welcome";
import ChatContainer from "../../components/chatContainer";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
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
      Axios.get(contactsRoute + currentUser._id)
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

  return (
    <section className={styles["chat-section"]}>
      <div className={styles["chat-container"]}>
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          chatChange={handlechatChange}
        />
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
      </div>
    </section>
  );
};

export default Chat;
