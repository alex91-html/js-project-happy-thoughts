import { useState } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (text) => {
    setThoughts([
      { text, likes: 0, time: "just now" },
      ...thoughts,
    ]);
  };

  const likeThought = (idx) => {
    setThoughts(thoughts.map((t, i) =>
      i === idx ? { ...t, likes: t.likes + 1 } : t
    ));
  };

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