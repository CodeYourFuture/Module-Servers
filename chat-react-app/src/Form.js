import { React, useState } from "react";

function Form(prop) {
  //   const [clearFrom, setClearFrom] = useState("");
  //   const [clearText, setClearText] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          prop.Submit(e.target.from.value, e.target.text.value);
          e.target.from.value = "";
          e.target.text.value = "";
        }}
      >
        <p>
          <input
            className="shape-btn name"
            type="text"
            name="from"
            placeholder="Your Name"
          />
        </p>
        <p>
          <textarea
            className="shape-btn message"
            type="text"
            name="text"
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
