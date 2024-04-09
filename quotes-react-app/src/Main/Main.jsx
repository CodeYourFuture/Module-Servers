import { useState, useEffect } from "react";

export const Main = () => {
  const [quotes, setQuotes] = useState([]);

  const quotesApi = "https://type.fit/api/quotes";

  useEffect(() => {
    const fetchQuotes = async (quotesSource) => {
      try {
        const response = await fetch(quotesSource);
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes(quotesApi);
  }, []);

  return (
    <main>
      <h2>Random Quote</h2>
      <p>Quote</p>
      <button>New Quote!</button>
    </main>
  );
};
