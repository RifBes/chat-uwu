import React from "react";
import "../styles/messages.scss";

export  interface MessageData {
  data: {
    user: {
      username: string;
    };
    message: string;
  }
}

interface MessagesProps {
  data: MessageData[];
  username: string;
}

const Messages = ({ data, username }: MessagesProps) => {
  return (
    <div className="message-container">
      {data.map((el, i) => {
        const itsMe =
          username.trim().toLowerCase() ===
          el.data.user.username.trim().toLowerCase();
        const className = itsMe ? "message-mine" : "message-user";
        // console.log(el);
        // console.log(el.data.message);
        return (
          <div key={i} className={`${className} message`}>
            <span className="message-name">{el.data.user.username}</span>
            <span className="message-text">{el.data.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
