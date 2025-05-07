const ThoughtCard = ({ text, likes, time, onLike }) => {
  return (
    <div className="bg-white border-2 rounded-sm shadow-solid-offset p-4 mb-8 w-full max-w-[510px] min-h-[140px] mx-auto break-words"
    >
      <p className="font-mono text-xl break-words ">{text}</p>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onLike}
            className="flex items-center gap-1 bg-gray-100 rounded-full px-4 py-2 text-pink-500 font-semibold hover:bg-pink-100 transition cursor-pointer"
          >
            <span role="img" aria-label="heart">❤️</span>
          </button>
          <span className="text-gray-400">x {likes}</span>
        </div>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div >
  );
};

export default ThoughtCard;




// "bg-[#F2F0F0] border-2 rounded-sm shadow-solid-offset p-4 mb-8 max-w-lg w-full mx-auto"