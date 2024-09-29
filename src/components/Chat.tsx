import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Input from "./Input";
import EmojiPicker from "emoji-picker-react";

import "../styles/chat.scss";
import Messages, { MessageData } from "./Messages";

// import emojiImg from "../img/emoji.png";
import emojiImg from '../img/emoji.png'


interface ChatState {
  [key: string]: string;
  room: string;
  username: string;
}

interface ChatProps {}

const socket = io("http://localhost:5000");
// const socket = io.connect("http://localhost:5000");

const Chat: React.FC<ChatProps> = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<ChatState>({ room: "", username: "" });
  const [state, setState] = useState<MessageData[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isOpenEmoji, setOpenEmoji] = useState<boolean>(false);
  const [users, setUsers] = useState<number>(1);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams as ChatState);

    // инициализация ивента, который слушается на сервере
    socket.emit("join", searchParams);
  }, [search]);

  //   получили послание, когда юзер только зашёл (message)
  useEffect(() => {
    socket.on("message", (data: MessageData) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("Room", ({ data: { users: usersCount } }: { data: { users: number[] } }) => {
      setUsers(usersCount.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    socket.emit("sendMessage", { message, params });
    setMessage("");
  };

  const onEmojiClick = ({ emoji }: { emoji: string }) => {
    setMessage(`${message} ${emoji}`);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        <div className="chat-title">{params.room}</div>
        <div className="chat-users">{users} users</div>
        <button className="chat-btn-left btn" onClick={leftRoom}>
          Left the room
        </button>
      </div>
      <div className="chat-messages">
        <Messages data={state} username={params.username} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <Input
          classNameWrapper="chat-input"
          name={message}
          inits="Write something!"
          handleChange={handleChange}
          placeholder="Write something"
        />
        <div className="chat-emojis">
          <img
            className="chat-emojis-img"
            alt=""
            src={emojiImg}
            onClick={() => setOpenEmoji(!isOpenEmoji)}
          />
          {isOpenEmoji && (
            <div className="chat-emoji">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className="chat-send">
          <button
            className="btn chat-send-btn"
            type="submit"
          >
            Send a message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;