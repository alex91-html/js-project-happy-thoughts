import { useState } from "react";


const ThoughtCard = ({ id, message, hearts, createdAt, onLike, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [editedMessage, setEditedMessage] = useState(message); // Track the updated message

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

  const handleSave = () => {
    onUpdate(id, editedMessage); // Call the onUpdate function with the new message
    setIsEditing(false); // Exit editing mode
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
            <span role="img" aria-label="heart" className="text-xl sm:text-lg">❤️</span>
          </button>
          <span className="text-gray-400">x {hearts}</span>
        </div>
        <span className="text-xs text-gray-400">{getTime(createdAt)}</span>
        {isEditing ? (
          // Show "Save" and "Cancel" buttons in editing mode
          <>
            <button
              onClick={handleSave}
              className="text-gray-500 hover:text-green-500 cursor-pointer">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)} // Cancel editing
              className="text-gray-500 hover:text-green-500 cursor-pointer">
              Cancel
            </button>
          </>
        ) : (
          // Show "Edit" and "Delete" buttons in view mode
          <>
            <button
              onClick={() => setIsEditing(true)} // Enter editing mode
              className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-gray-400 hover:text-blue-500 transition">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>

            </button>
            <button
              onClick={() => onDelete(id)}
              className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-gray-400 hover:text-red-500 transition">
                <path strokeLinecap="round"
                  strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ThoughtCard;