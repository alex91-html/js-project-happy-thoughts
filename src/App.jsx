import { useState, useEffect } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

const API_URL = "http://localhost:8080" // local development
// const API_URL = "https://alex-js-project-api.onrender.com" // production 

const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const fetchThoughts = async () => {
    try {
      const response = await fetch(`${API_URL}/thoughts`);
      if (response.ok) {
        const data = await response.json();
        setThoughts(data);
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
      console.log("Adding new thought:", newThought);
      const response = await fetch(`${API_URL}/thoughts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newThought),
      });

      if (response.ok) {
        const createdThought = await response.json();
        setThoughts([createdThought, ...thoughts]);
      } else {
        console.error("Failed to add thought:", response.status, response.statusText);
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
        const updatedThought = await response.json();
        setThoughts((prevThoughts) =>
          prevThoughts.map((thought) =>
            thought._id === id ? updatedThought : thought
          )
        );
      } else {
        console.error("Failed to like thought:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error liking thought:", error);
    }
  };

  const updateThought = async (id, newMessage) => {
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        const updatedThought = await response.json();
        setThoughts((prevThoughts) =>
          prevThoughts.map((thought) =>
            thought._id === id ? updatedThought : thought
          )
        );
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
        setThoughts((prevThoughts) =>
          prevThoughts.filter((thought) => thought._id !== id)
        );
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center px-2">
      <div className="max-w-xl w-full mx-auto">
        <h1 className="text-5xl font-bold mb-11 text-center text-pink-400">Happy Thoughts</h1>
        <ThoughtInput onAddThought={addThought} />
        <ThoughtList
          thoughts={thoughts}
          onLike={likeThought}
          onUpdate={updateThought}
          onDelete={deleteThought}
        />
      </div>
    </div>
  );
};

export default App;

