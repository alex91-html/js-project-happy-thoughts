import { useState, useEffect } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

const API_URL = "https://alex-js-project-api.onrender.com";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const fetchThoughts = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setThoughts(data);
      }
    } catch (error) {
      // Optionally, handle errors more gracefully here
    }
  };

  const addThought = async (text) => {
    const newThought = { message: text };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newThought),
      });

      if (response.ok) {
        const createdThought = await response.json();
        setThoughts([createdThought, ...thoughts]);
      }
    } catch (error) {
      // Optionally, handle errors more gracefully here
    }
  };

  const likeThought = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/like`, {
        method: "POST",
      });

      if (response.ok) {
        setThoughts(thoughts.map((thought) =>
          thought._id === id ? { ...thought, hearts: thought.hearts + 1 } : thought
        ));
      }
    } catch (error) {
      // Optionally, handle errors more gracefully here
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center px-2">
      <div className="max-w-xl w-full mx-auto">
        <h1 className="text-5xl font-bold mb-11 text-center text-pink-400">Happy Thought</h1>
        <ThoughtInput onAddThought={addThought} />
        <ThoughtList thoughts={thoughts} onLike={likeThought} />
      </div>
    </div>
  );
};