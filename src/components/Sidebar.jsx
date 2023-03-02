import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

function Sidebar(props) {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default Sidebar;
