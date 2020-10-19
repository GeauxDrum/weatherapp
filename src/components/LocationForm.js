import React, { useState } from "react";

export default function LocationForm({
  getDeetz,
  inputBackground,
  inputTextColor,
}) {
  const [input, setInput] = useState("");

  const locationFormSubmit = (e) => {
    e.preventDefault();
    getDeetz(input);
    setInput("");
  };

  return (
    <form onSubmit={locationFormSubmit}>
      <input
        style={{ backgroundColor: inputBackground, color: inputTextColor }}
        className="input"
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
