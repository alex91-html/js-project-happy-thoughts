import { useState, useEffect } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

const API_URL = "https://alex-js-project-api.onrender.com";
// const API_URL = "http://localhost:8080"; // Uncomment for local development

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

  const updateThought = async (id, updatedMessage) => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: updatedMessage }),
      });

      if (response.ok) {
        const updatedThought = await response.json();
        setThoughts(thoughts.map((thought) =>
          thought._id === id ? updatedThought : thought
        ));
      } else {
        console.error("Failed to update thought:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error updating thought:", error);
    }
  };

  const deleteThought = async (id) => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted thought from the state
        setThoughts(thoughts.filter((thought) => thought._id !== id));
      } else {
        console.error("Failed to delete thought:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error deleting thought:", error);
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
        <ThoughtList thoughts={thoughts} onLike={likeThought} onUpdate={updateThought} onDelete={deleteThought} />
      </div>
    </div>
  );
};

export default App;