import React, { useState } from "react";

export default function LocationForm({ getDeetz }) {
  const [input, setInput] = useState("");

  const locationFormSubmit = (e) => {
    e.preventDefault();
    getDeetz(input);
    setInput("");
  };

  return (
    <form onSubmit={locationFormSubmit}>
      <input
        type="text"
        value={input}
        placeholder="select location"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></input>
    </form>
  );
}
