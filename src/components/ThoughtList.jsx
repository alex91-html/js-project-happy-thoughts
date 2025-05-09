import ThoughtCard from "./ThoughtCard";

const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <div>
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          id={thought._id}
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
          onLike={onLike}

        />
      ))}
    </div>
  );
};

export default ThoughtList;