import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://likeable-standing-beryl.glitch.me/quotes/random"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <p>" {data.quote} " </p>
      <p>By: {data.author}</p>
      <button onClick={fetchData}>Get a quote</button>
    </div>
  );
}

export default App;
