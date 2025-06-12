const ThoughtCard = ({ id, message, hearts, createdAt, onLike, onUpdate, onDelete }) => {
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
      <p className="font-mono text-xl break-words">{message}</p>
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
        <button
          onClick={() => onUpdate(id)}
          className="text-blue-500 hover:underline">
          Update
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ThoughtCard;