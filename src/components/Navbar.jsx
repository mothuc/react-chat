import React, { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  console.log("user", currentUser);
  return (
    <div className="navbar">
      <div className="user-avatar">
        <Avatar name={currentUser.displayName} />
      </div>
      <span className="logo">Chat</span>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default Navbar;
