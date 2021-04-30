import react from "react";

const Part = ({ part }) => {
  return (
    <div>
      {" "}
      {part.name} - {part.number}
    </div>
  );
};

export default Part;
