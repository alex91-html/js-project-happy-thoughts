import { useState, useEffect } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

const API_URL = "https://alex-js-project-api.onrender.com";

const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const fetchThoughts = async () => {
    try {
      const response = await fetch(`${API_URL}/thoughts`);
      if (response.ok) {
        const data = await response.json();
        setThoughts(Array.isArray(data) ? data : []); // Ensure data is an array
      } else {
        console.error("Failed to fetch thoughts:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching thoughts:", error);
    }
  };

  const addThought = async (text) => {
    const newThought = { message: text };
    try {
      const response = await fetch(`${API_URL}/thoughts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newThought),
      });

      if (response.ok) {
        const createdThought = await response.json();
        setThoughts([createdThought, ...thoughts]);
      }
    } catch (error) {
      console.error("Error adding thought:", error);

    }
  };

  const likeThought = async (id) => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}/like`, {
        method: "POST",
      });

      if (response.ok) {
        setThoughts(thoughts.map((thought) =>
          thought._id === id ? { ...thought, hearts: thought.hearts + 1 } : thought
        ));
      } else {
        console.error("Failed to like thought:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error liking thought:", error);
    }
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  // Render the app
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

export default App;