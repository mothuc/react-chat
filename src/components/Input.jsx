import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";

import { v4 as uuid } from "uuid";

import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  let tempInputImg = "";
  const handleInputImg = (e) => {
    const imgFile = e.target.files[0];
    tempInputImg = imgFile;
    const previewURL = URL.createObjectURL(imgFile);

    setImg(imgFile);
    setImgPreview(previewURL);
  };

  const cancelInputImg = () => {
    setImgPreview(null);
    setImg(null);
    tempInputImg = "";
  };

  const handleSend = async () => {
    if (img) {
      console.log("img start");
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImgPreview(null);
    setImg(null);
    tempInputImg = "";
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  return (
    <div className="input-container">
      <div className="input-handle">
        {imgPreview ? (
          <div className="imgPreview">
            <div className="imgPre">
              <img src={imgPreview} alt="Preview" />
              <button onClick={cancelInputImg}>x</button>
            </div>
          </div>
        ) : (
          <input
            type="text"
            placeholder="Enter your message"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleKey}
          />
        )}
        {}
      </div>
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          value={tempInputImg}
          onChange={handleInputImg}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
