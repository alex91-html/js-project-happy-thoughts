import ThoughtCard from "./ThoughtCard";

const ThoughtList = ({ thoughts, onLike, onUpdate, onDelete }) => {
  if (!Array.isArray(thoughts) || thoughts.length === 0) {
    return <p style={{ textAlign: "center" }}>No thoughts available.</p>; // Handle empty data
  }

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
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ThoughtList;