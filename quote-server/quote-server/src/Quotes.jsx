import React, { useState } from "react";

const GenerateQuote = () => {
  const [quote, setQuote] = useState("");

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
      setQuote(data.quote); // Update state with the fetched quote
    } catch (error) {
      console.error("Error fetching random quote:", error);
    }
  };

  return (
    <div>
      <h2>Generate Quote</h2>
      <button onClick={fetchRandomQuote}>Generate Random Quote</button>
      {quote && <p>{quote}</p>}
    </div>
  );
};

export default GenerateQuote;
