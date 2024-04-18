import "./App.css";
import Header from "./Header";
import NewQuote from "./NewQuote";
import { useState } from "react";

function App() {
  const [randomQuote, setRandomQuote] = useState({quote: "Are you feeling", author: ""});
  const apiEndpoint = "https://quote-server-tbmpxe4ij3hq.runkit.sh/quotes/random";

  function getRandomQuote() {
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => setRandomQuote(data));
  }

  return (
    <>
      <Header />
      <NewQuote quote={randomQuote.quote} author={randomQuote.author} />
      <button onClick={getRandomQuote}>Lucky ?</button>
    </>
  );
}

export default App;
