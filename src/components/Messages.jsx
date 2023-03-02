import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";

import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const messagesRef = useRef(null);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    scrollToBottom();

    return () => {
      unSub();
    };
  }, [data.chatId]);

  function scrollToBottom() {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }

  return (
    <div ref={messagesRef} className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}

export default Messages;
