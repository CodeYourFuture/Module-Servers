import { useState, useEffect } from "react";

export const Main = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const quotesApi = "https://type.fit/api/quotes";

  useEffect(() => {
    const fetchQuotes = async (quotesSource) => {
      try {
        const response = await fetch(quotesSource);
        const data = await response.json();
        setQuotes(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes(quotesApi);
  }, []);

  function pickRandomQuote(arrayOfQuotes) {
    return arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
  }

  const randomQuote = pickRandomQuote(quotes);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h2>Random Quote</h2>
      <h3>{randomQuote.text}</h3>
      <p>{randomQuote.author}</p>
      <button>New Quote!</button>
    </main>
  );
};
