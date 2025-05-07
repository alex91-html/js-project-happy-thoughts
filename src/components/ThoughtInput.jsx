import { useState, useRef } from "react";

const MAX_LENGTH = 140;
const MIN_LENGTH = 5;

const ThoughtInput = ({ onAddThought }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  const charsLeft = MAX_LENGTH - text.length;

  const handleInput = (e) => {
    setText(e.target.value);
    setError("");

    // Auto-resize the textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < MIN_LENGTH) {
      setError("Your thought is too short!");
      return;
    }
    if (text.trim().length > MAX_LENGTH) {
      setError("Your thought is too long!");
      return;
    }
    if (!text.trim()) {
      setError("Please enter a happy thought!");
      return;
    }
    onAddThought(text.trim());
    setText("");
    setError("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
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
        ref={textareaRef}
        className="bg-[#FFFFFF] w-full border-2 rounded-sm p-2 font-mono mb-2 resize-none"
        rows={2}
        value={text}
        onInput={handleInput}
        placeholder="Type your happy thought here..."
        maxLength={MAX_LENGTH + 10}
        style={{ overflow: "hidden" }}
      />

      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-sm ${charsLeft < 0 ? "text-red-500" : "text-gray-400"}`}
        >
          {charsLeft} characters left
        </span>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-400 to-pink-300 text-white font-semibold rounded-full px-6 py-2 shadow flex items-center gap-2 mx-auto block hover:from-pink-500 hover:to-pink-400 transition disabled:opacity-50"
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