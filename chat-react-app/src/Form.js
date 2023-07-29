import { React } from "react";

function Form(prop) {
  //   const [clearFrom, setClearFrom] = useState("");
  //   const [clearText, setClearText] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          prop.Submit(
            e.target.id.value,
            e.target.from.value,
            e.target.text.value
          );
          e.target.from.value = "";
          e.target.text.value = "";
          prop.updateId(1.1);
          prop.updateFrom("");
          prop.updateText("");
        }}
      >
        <p>
          <input
            className="shape-btn name id"
            type="number"
            name="id"
            value={prop.id}
            placeholder="Your ID"
          />
        </p>
        <p>
          <input
            onChange={(e) => {
              prop.updateFrom(e.target.value);
            }}
            className="shape-btn name"
            type="text"
            name="from"
            value={prop.from}
            placeholder="Your Name"
          />
        </p>
        <p>
          <textarea
            onChange={(e) => {
              prop.updateText(e.target.value);
            }}
            className="shape-btn message"
            type="text"
            name="text"
            value={prop.text}
            placeholder="The message..."
          ></textarea>
          <button type="submit" className="shape-btn">
            Send
          </button>
        </p>
      </form>
    </div>
  );
}

export default Form;
