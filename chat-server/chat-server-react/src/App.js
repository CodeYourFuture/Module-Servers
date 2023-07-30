import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:3001/messages", {
      method: "POST",
      body: JSON.stringify({ from: "Daniel", text: "Hello" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);
  // useEffect(() => {
  //   fetch("http://localhost:3001/messages")
  //     .then((response) => response.json())
  //     .then((data) => data);
  // }, []);
  // fetch("http://localhost:3001/messages", {
  //   method: "POST",
  //   body: JSON.stringify({ from: "Daniel", text: "Hello" }),
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
  return (
    <form>
      <p>
        Name: <input type="text" name="from" placeholder="Your Name" /> <br />
        Message: <input type="text" name="text" placeholder="The message..." />
        <br />
      </p>
      <button>Send</button>
    </form>
  );
}

export default App;
