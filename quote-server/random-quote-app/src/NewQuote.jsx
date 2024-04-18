const NewQuote = ({ quote, author }) => {
  return (
    <div className="container">
      <p>{quote}</p>
      <p>{author}</p>
    </div>
  );
};

export default NewQuote;
