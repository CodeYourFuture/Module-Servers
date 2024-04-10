import { useState, useEffect } from "react";

export const Main = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const quotesApi = "https://quotes-server-kxpndusosfe0.runkit.sh/quotes";

  useEffect(() => {
    const fetchQuotes = async (quotesSource) => {
      try {
        const response = await fetch(quotesSource);
        const data = await response.json();
        setQuotes(data);
        setIsLoading(false);
        setRandomQuote(pickRandomQuote(data));
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes(quotesApi);
  }, []);

  function pickRandomQuote(arrayOfQuotes) {
    return arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
  }

  const handleNewQuote = () => {
    setRandomQuote(pickRandomQuote(quotes));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h2>Random Quote</h2>
      <h3>{randomQuote.quote}</h3>
      <p>{randomQuote.author}</p>
      <button onClick={handleNewQuote}>New Quote!</button>
    </main>
  );
};