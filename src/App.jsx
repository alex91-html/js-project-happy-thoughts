import { useState, useEffect } from "react";
import ThoughtList from "./components/ThoughtList";
import ThoughtInputContainer from "./components/ThoughtInputContainer";

// const API_URL = "http://localhost:8080" // local development
const API_URL = "https://alex-js-project-api.onrender.com" // production 

const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || "");
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "");
  const [authError, setAuthError] = useState("");

  const fetchThoughts = async () => {
    try {
      const response = await fetch(`${API_URL}/thoughts`);
      if (response.ok) {
        const data = await response.json();
        setThoughts(data);
      } else {
        console.error("Failed to fetch thoughts:", response.status, response.statusText);
      }
    } catch {
      console.error("Error fetching thoughts");
    }
  };

  const addThought = async (text) => {
    const newThought = { message: text };
    if (!accessToken) {
      setAuthError("You must be logged in to add a thought.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/thoughts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        },
        body: JSON.stringify(newThought),
      });
      if (response.ok) {
        const createdThought = await response.json();
        setThoughts([createdThought, ...thoughts]);
        setAuthError("");
      } else if (response.status === 401 || response.status === 403) {
        setAuthError("You are not authorized to add a thought. Please log in.");
      } else {
        setAuthError("Failed to add thought.");
      }
    } catch {
      setAuthError("Error adding thought. Please try again.");
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
    } catch {
      console.error("Error liking thought");
    }
  };

  const updateThought = async (id, newMessage) => {
    if (!accessToken) {
      setAuthError("You must be logged in to update a thought.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken
        },
        body: JSON.stringify({ message: newMessage }),
      });
      if (response.ok) {
        const updatedThought = await response.json();
        setThoughts((prevThoughts) =>
          prevThoughts.map((thought) =>
            thought._id === id ? updatedThought : thought
          )
        );
        setAuthError("");
      } else if (response.status === 401 || response.status === 403) {
        setAuthError("You are not authorized to update this thought. Please log in.");
      } else {
        setAuthError("Failed to update thought.");
      }
    } catch {
      setAuthError("Error updating thought. Please try again.");
    }
  };

  const deleteThought = async (id) => {
    if (!accessToken) {
      setAuthError("You must be logged in to delete a thought.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/thoughts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: accessToken
        },
      });
      if (response.ok) {
        setThoughts((prevThoughts) =>
          prevThoughts.filter((thought) => thought._id !== id)
        );
        setAuthError("");
      } else if (response.status === 401 || response.status === 403) {
        setAuthError("You are not authorized to delete this thought. Please log in.");
      } else {
        setAuthError("Failed to delete thought.");
      }
    } catch {
      setAuthError("Error deleting thought. Please try again.");
    }
  };

  const handleAuthSuccess = (token, user) => {
    setAccessToken(token);
    setUsername(user);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", user);
  };

  const handleLogout = () => {
    setAccessToken("");
    setUsername("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
  };

  useEffect(() => {
    fetchThoughts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center px-2">
      <div className="max-w-xl w-full mx-auto">
        <h1 className="text-5xl font-bold mb-11 text-center text-pink-400">Happy Thoughts</h1>
        <div className="flex justify-end mb-4">
          {accessToken && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Hello, {username}!</span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {authError && (
          <div className="text-red-500 text-center mb-4">{authError}</div>
        )}
        <ThoughtInputContainer
          accessToken={accessToken}
          onAddThought={addThought}
          onAuthSuccess={handleAuthSuccess}
          username={username}
        />
        <ThoughtList
          thoughts={thoughts}
          onLike={likeThought}
          onUpdate={updateThought}
          onDelete={deleteThought}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
};

export default App;

