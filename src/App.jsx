import { useState } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtCard from "./components/ThoughtCard";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (text) => {
    setThoughts([
      { text, likes: 0, time: "just now", animate: true },
      ...thoughts.map((t) => ({ ...t, animate: false })),
    ]);


    setTimeout(() => {
      setThoughts((prevThoughts) =>
        prevThoughts.map((t, i) =>
          i === 0 ? { ...t, animate: false } : t
        )
      );
    }, 500);
  };

  const likeThought = (idx) => {
    setThoughts(thoughts.map((t, i) =>
      i === idx ? { ...t, likes: t.likes + 1 } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center px-2">
      <ThoughtInput onAddThought={addThought} />
      {thoughts.map((thought, idx) => (
        <div key={idx} className={thought.animate ? "animate-fadeIn" : ""}>
          <ThoughtCard
            text={thought.text}
            likes={thought.likes}
            time={thought.time}
            onLike={() => likeThought(idx)}
          />
        </div>
      ))}
    </div>
  );
};