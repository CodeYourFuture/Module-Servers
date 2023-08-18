import React from "react";

function Search(prop) {
  function latestMessages() {
    fetch("https://appolinfotso-chat-server.glitch.me/messages/latest", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        prop.latest(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function allMessages() {
    fetch("https://appolinfotso-chat-server.glitch.me/messages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        prop.latest(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function randomMessages() {
    fetch("https://appolinfotso-chat-server.glitch.me/messages/random", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        prop.latest(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function searchMessages(id) {
    fetch(`https://appolinfotso-chat-server.glitch.me/messages/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        prop.latest(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchMessages(e.target.search.value);
          console.log(e.target.search.value);
          e.target.search.value = "";
        }}
      >
        <input type="search" name="search" placeholder="Message ID" />

        <button type="submit">Search</button>
      </form>
      <button
        onClick={() => {
          allMessages();
        }}
      >
        All messages
      </button>
      <button
        onClick={() => {
          randomMessages();
        }}
      >
        Random messages
      </button>
      <button
        onClick={() => {
          latestMessages();
        }}
      >
        Latest messages
      </button>
    </div>
  );
}

export default Search;
