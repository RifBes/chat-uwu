import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./Join";
import Chat from "./Chat";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/" element={<Join />} />
    </Routes>
  );
};

export default AppRoute;
