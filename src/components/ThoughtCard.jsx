const ThoughtCard = ({ text, likes, time, onLike }) => {
  return (
    <div className="bg-white border-2 rounded-sm shadow-solid-offset p-4 mb-8 max-w-lg w-full min-w-[300px] mx-auto h-[150px] flex flex-col justify-between">
      <p className="font-mono text-xl break-words overflow-hidden">{text}</p>
      <div className="flex items-center justify-between">
        <button
          onClick={onLike}
          className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 text-pink-500 font-semibold hover:bg-pink-100 transition cursor-pointer"
        >
          <span role="img" aria-label="heart">❤️</span>
        </button>
        <span className="text-gray-400">x {likes}</span>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div >
  );
};

export default ThoughtCard;