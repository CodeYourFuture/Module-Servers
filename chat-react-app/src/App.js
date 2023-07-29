import "./App.css";
import Chat from "./Chats";
import Search from "./SearchChat";
import Form from "./Form";
import { useState } from "react";

function App() {
  const [posted, setPosted] = useState([]);
  const [id, setId] = useState(1.1);

  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  // post a message
  function handleSubmit(i, f, t) {
    console.log(f, t);
    let data = new URLSearchParams();
    data.append("id", i);
    data.append("from", f);
    data.append("text", t);

    fetch("https://appolinfotso-chat-server.glitch.me/messages", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosted(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-search">
          <Search latest={setPosted} />
        </div>
        <div className="chat-messages">
          <Chat
            delete={setPosted}
            postMe={posted}
            updateId={setId}
            updateFrom={setFrom}
            updateText={setText}
          />
        </div>

        <div className="chat-form">
          <Form
            Submit={handleSubmit}
            id={id}
            from={from}
            text={text}
            updateId={setId}
            updateFrom={setFrom}
            updateText={setText}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
