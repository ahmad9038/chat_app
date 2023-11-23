import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//pages
import AccountPage from "./pages/AccountPage";
import Home from "./pages/Home";
import "./App.css";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<AccountPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
