import React from "react";
import { nanoid } from "nanoid";

function Chat(prop) {
  if (prop.postMe === []) {
    console.log("empty array");
  } else {
    const message = prop.postMe.map((el) => {
      return (
        <div key={nanoid()} className="single-chat">
          <h2>{el.from}</h2>
          <p>{el.text}</p>
          <h4>Posted: {el.timeSent}</h4>
        </div>
      );
    });

    return <div>{message}</div>;
  }
}

export default Chat;
