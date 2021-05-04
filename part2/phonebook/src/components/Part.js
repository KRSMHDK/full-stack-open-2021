import React from "react";

const Part = ({ part, deletePerson }) => {
  return (
    <div>
      {" "}
      <div>
        {part.name} - {part.number}
        <button value={part.id} onClick={deletePerson}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Part;
