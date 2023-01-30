import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { SocketProvider, SocketContext } from "./context/socketContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  const socket = useContext(SocketContext);

  return (
    <div className="App">
      <SocketProvider socket={socket}>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
