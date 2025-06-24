import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // Import icons

const ThoughtCard = ({ id, message, hearts, createdAt, onLike, onUpdate, onDelete, accessToken }) => {
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [editedMessage, setEditedMessage] = useState(message); // Track the updated message

  const handleSave = () => {
    onUpdate(id, editedMessage); // Call the onUpdate function with the new message
    setIsEditing(false); // Exit editing mode
  };

  const getTime = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <div className="bg-white border-2 rounded-sm shadow-solid-offset p-4 mb-8 w-full animate-fadeIn">
      {isEditing ? (
        // Show input field when in editing mode
        <input
          type="text"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)} // Update the edited message
          className="w-full border rounded px-2 py-1 text-xl font-mono"
        />
      ) : (
        // Show the message when not in editing mode
        <p className="font-mono text-xl break-words">{message}</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(id)}
            className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 text-pink-500 font-semibold hover:bg-pink-100 transition cursor-pointer">
            ❤️ {hearts}
          </button>
        </div>
        <span className="text-xs text-gray-400">{getTime(createdAt)}</span>
        {isEditing ? (
          // Show "Save" and "Cancel" buttons in editing mode
          <>
            <button onClick={handleSave} className="text-gray-400 hover:text-green-500 cursor-pointer">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500 cursor-pointer">
              Cancel
            </button>
          </>
        ) : (
          // Show "Edit" and "Delete" buttons in view mode with icons
          <>
            {accessToken && (
              <div className="flex gap-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-gray-400 hover:text-blue-700 cursor-pointer"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="flex items-center text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <FiTrash size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ThoughtCard;