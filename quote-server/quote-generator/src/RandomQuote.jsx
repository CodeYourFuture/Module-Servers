import { useState } from "react";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");

  //   useEffect(() => {
  //     fetchQuote();
  //   }, []);

  const fetchQuote = () => {
    // axios
    //   .get("https://api.quotable.io/quotes/random")
    //   .then((response) => {
    //     setQuote(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Failed to fetch quote", error);
    //   });
    fetch("http://localhost:3000/quotes/random")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuote(data);
      });
  };

  return (
    <div>
      <h2>Random Quote:</h2>
      <blockquote>
        {quote && (
          <>
            <p>{quote.quote}</p>
            <footer>- {quote.author}</footer>
          </>
        )}
      </blockquote>
      <button method onClick={fetchQuote}>
        Get New Quote
      </button>
    </div>
  );
};

export default RandomQuote;
