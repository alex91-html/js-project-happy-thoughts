import ThoughtCard from "./ThoughtCard";

const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <div className="w-full max widhth-[600px] mx-auto">
      {thoughts.map((thought, idx) => (
        <div key={idx} className="mb-4">
          <ThoughtCard
            text={thought.text}
            likes={thought.likes}
            time={thought.time}
            onLike={() => onLike(idx)}
          />
        </div>
      ))}
    </div>
  );
};

export default ThoughtList;