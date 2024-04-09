import { useState } from "react";

export const Main = () => {
  const [quotes, setQuotes] = useState([])

  const quotesApi = "https://type.fit/api/quotes";

  const fetchQuotes = async (quotesSource) => {
    const response = await fetch(quotesSource);
    const data = await response.json();
    setQuotes(data);
  }

  fetchQuotes(quotesApi);

  return (
    <main>
      <h2>Random Quote</h2>
      <p>Quote</p>
      <button>New Quote!</button>
    </main>
  )
}