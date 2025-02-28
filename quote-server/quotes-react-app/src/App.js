import React, { useState, useEffect } from "react";

const QUOTE_API_URL = "http://localhost:3001/quotes/random"; // Update with your server URL

function App() {
  const [quote, setQuote] = useState(null);

  // Fetch a new quote
  const fetchQuote = async () => {
    try {
      const response = await fetch(QUOTE_API_URL);
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote(); // Load a quote on page load
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card} onClick={fetchQuote}>
        <p style={styles.quote}>
          <span style={styles.quoteMark}>&ldquo;</span>
          {quote ? quote.quote : "Loading..."}
          <span style={styles.quoteMark}>&rdquo;</span>
        </p>
        <p style={styles.author}>{quote ? `- ${quote.author}` : ""}</p>
      </div>
      <button style={styles.button} onClick={fetchQuote}>
        New Quote
      </button>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#ccc",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "500px",
    cursor: "pointer",
  },
  quote: {
    fontSize: "1.5em",
    fontStyle: "italic",
  },
  author: {
    marginTop: "10px",
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  quoteMark: {
    fontSize: "2em",
    color: "gray",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.2em",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#555",
    color: "#fff",
    cursor: "pointer",
  },
};

export default App;
