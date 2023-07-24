import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";

function Search(prop) {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="controller">
      <p>
        <input
          type="search"
          placeholder="Type quote term"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            prop.search(inputValue);
          }}
        >
          Search
        </button>
      </p>
      <p>
        <button onClick={prop.displayQuotes}>Display All Quotes</button>
      </p>
      <p>
        <button onClick={prop.random}>Random Quote</button>
      </p>
    </div>
  );
}

export default Search;
