import { useState } from "react";

// character limit logic:
const MAX_LENGTH = 94;
const MIN_LENGTH = 4;

const ThoughtInput = ({ onAddThought }) => {
  const [text, setText] = useState("");

  const charsLeft = MAX_LENGTH - text.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddThought(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F2F0F0] border-2 rounded-sm shadow-solid-offset p-4 mb-8 max-w-lg w-full mx-auto"
    >
      <label className="block mb-2 font-semibold text-[#333]">
        What's making you happy right now?
      </label>

      <textarea
        className="bg-[#FFFFFF] w-full border-2 rounded-sm p-2 font-mono mb-2 resize-none "
        rows={2}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
        placeholder="Type your happy thought here..."
        maxLength={MAX_LENGTH}
      />

      <div className="flex justify-end items-center mb-4">
        <span className="text-sm text-gray-400">
          {charsLeft} characters left
        </span>
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-400 to-pink-300 text-white font-semibold rounded-full px-6 py-2 shadow flex items-center gap-2 mx-auto block hover:from-pink-500 hover:to-pink-400 transition disabled:opacity-50 cursor-pointer"
        disabled={text.length < MIN_LENGTH || text.length > MAX_LENGTH}
      >
        <span role="img" aria-label="heart">❤️</span>
        Send Happy Thought
        <span role="img" aria-label="heart">❤️</span>
      </button>
    </form>
  );
};

export default ThoughtInput;