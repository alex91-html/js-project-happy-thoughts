import { useState, useEffect } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

const API_URL = "https://happy-thoughts-technigo.herokuapp.com/thoughts";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);



  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center px-2">
      <div className="max-w-xl w-full mx-auto">
        <header className="text-5xl font-bold mb-11 text-center text-pink-400">Happy Thought</header>
        <ThoughtInput onAddThought={addThought} />
        <ThoughtList thoughts={thoughts} onLike={likeThought} />
      </div>
    </div>
  );
};