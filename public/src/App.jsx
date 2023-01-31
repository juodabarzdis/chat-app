import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { MainContext } from "./context/MainContext";
import io from "socket.io-client";
import Axios from "axios";
import { checkAuthRoute } from "./utils/APIRoutes";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [socket, setSocket] = useState(io("http://localhost:5000"));

  const navigate = useNavigate();
  const value = {
    socket,
    setSocket,
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    Axios.get(checkAuthRoute, { withCredentials: true })
      .then((res) => {
        setCurrentUser(res.data.user);
        console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <MainContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MainContext.Provider>
    </div>
  );
}

export default App;
