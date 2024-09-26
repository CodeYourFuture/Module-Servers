import React, { useState } from "react";
import "./Quote.css";

const GenerateQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // Function to fetch a random quote from the server
  const fetchRandomQuote = async () => {
    try {
      const response = await fetch(
        "https://behrouz-quotes-newver-3kny10jj2q1h.runkit.sh/quotes/random"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch random quote");
      }
      const data = await response.json();
      console.log(data);
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  return (
    <div>
      <h2>Generate Quote</h2>
      {quote && <p>{quote}</p>}
      {author && <p id="author">{author}</p>}
      <button onClick={fetchRandomQuote}>Generate Random Quote</button>
    </div>
  );
};

export default GenerateQuote;
