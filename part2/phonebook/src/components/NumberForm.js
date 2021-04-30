import react from "react";
import Part from "./Part";

const NumberForm = ({ persons, newFilter }) => {
  const filterPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Numbers:</h2>
      {filterPerson.map((p) => (
        <Part part={p} />
      ))}
    </div>
  );
};

export default NumberForm;
