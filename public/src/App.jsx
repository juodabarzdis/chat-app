import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/chat";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
