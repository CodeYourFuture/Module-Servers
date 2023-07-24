import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Quotes from "./Quotes";
import Search from "./SearchButton";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [increment, setIncrement] = useState(0);
  const [increase, setIncrease] = useState(0);

  function handleOnclick() {
    let x = Math.random();
    setIncrement(x);
  }
  function randomOnclick() {
    let y = Math.random();
    setIncrease(y);
  }
  function searchTerm(term) {
    if (term) {
      fetch(
        `https://appolinfotso-quote-server.glitch.me/quotes/search?term=${term}`
      )
        .then((res) => res.json())
        .then((data) => {
          setQuotes(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setQuotes([]);
    }
  }

  //
  useEffect(() => {
    if (increment > 0) {
      fetch("https://appolinfotso-quote-server.glitch.me/quotes/")
        .then((res) => res.json())
        .then((data) => {
          setQuotes(data);
          setIncrement(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (increase > 0) {
      fetch("https://appolinfotso-quote-server.glitch.me/quotes/random")
        .then((res) => res.json())
        .then((data) => {
          setQuotes(data);
          setIncrease(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [increment, increase]);
  //
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Quote Server</p>
        </header>
      </div>
      <div>
        <Search
          displayQuotes={handleOnclick}
          random={randomOnclick}
          search={searchTerm}
        />
      </div>
      <div>
        <Quotes quotes={quotes} />
      </div>
    </div>
  );
}

export default App;
