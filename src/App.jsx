import { useState, useEffect } from "react";
import ThoughtInput from "./components/ThoughtInput";
import ThoughtList from "./components/ThoughtList";

const API_URL = "http://localhost:8080"; // Use your backend URL

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

  useEffect(() => {
    fetchThoughts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center px-2">
      <div className="max-w-xl w-full mx-auto">
        <h1 className="text-5xl font-bold mb-11 text-center text-pink-400">Happy Thoughts</h1>
        <ThoughtInput onAddThought={addThought} />
        <ThoughtList thoughts={thoughts} />
      </div>
    </div>
  );
};

export default App;

