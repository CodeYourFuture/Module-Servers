import React from "react";
import { nanoid } from "nanoid";

function Chat(prop) {
  function editMessages(id) {
    fetch(`https://appolinfotso-chat-server.glitch.me/messages/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        prop.updateId(data[0].id);

        prop.updateFrom(data[0].from);
        prop.updateText(data[0].text);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteMessages(id) {
    fetch(`https://appolinfotso-chat-server.glitch.me/messages/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        prop.delete(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //
  if (prop.postMe === []) {
    console.log("empty array");
  }
  if (typeof prop.postMe == "string") {
    return <div className="deleteMessage">{prop.postMe}</div>;
  } else {
    const message = prop.postMe.map((el) => {
      return (
        <div key={nanoid()} className="single-chat">
          <h2>
            <span>#</span>
            <span>{el.id}</span>
            <span className="tag">{el.from}</span>
            <span className="edit-del">
              <button
                className="edit"
                onClick={(e) => {
                  e.preventDefault();
                  editMessages(
                    e.target.parentNode.parentNode.children[1].innerText
                  );
                }}
              >
                EDIT
              </button>

              <button
                className="delete"
                onClick={(e) => {
                  e.preventDefault();
                  deleteMessages(
                    e.target.parentNode.parentNode.children[1].innerText
                  );
                }}
              >
                X
              </button>
            </span>
          </h2>
          <p>{el.text}</p>
          <h4>Posted: {el.timeSent}</h4>
        </div>
      );
    });

    return <div>{message}</div>;
  }
}

export default Chat;
