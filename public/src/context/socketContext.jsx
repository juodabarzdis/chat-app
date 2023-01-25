import React, { createContext, useState } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(io("http://localhost:5000"));

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
