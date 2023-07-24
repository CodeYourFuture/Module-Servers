import React from "react";
import ReactDOM from "react-dom/client";
import { nanoid } from "nanoid";

function Quotes(prop) {
  const quotes = prop.quotes.map((el) => {
    return (
      <div key={nanoid()} className="quote">
        <p>
          <q>{el.quote}</q>
        </p>
        <p>{el.author}</p>
      </div>
    );
  });
  return <div className="quote-container">{quotes}</div>;
}

export default Quotes;
