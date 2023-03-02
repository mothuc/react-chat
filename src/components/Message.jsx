import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Avatar from "./Avatar";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      {message.text !== "" ? (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
          <div className="messageInfo">
            {message.senderId !== currentUser.uid && (
              <Avatar
                name={
                  message.senderId === currentUser.uid
                    ? currentUser.displayName
                    : data.user.displayName
                }
              />
            )}
          </div>
          <div className="messageContent">
            <p>{message.text}</p>
          </div>
        </div>
      ) : (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
          <div className="messageInfo">
            {message.senderId !== currentUser.uid && (
              <Avatar
                name={
                  message.senderId === currentUser.uid
                    ? currentUser.displayName
                    : data.user.displayName
                }
              />
            )}
          </div>
          <div className="messageContent">
            <img src={message.img} alt="img" />
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
