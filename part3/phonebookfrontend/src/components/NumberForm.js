import React from "react";
import Part from "./Part";

const NumberForm = ({ persons, deletePerson, newFilter }) => {
  const filterPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Numbers:</h2>
      {filterPerson.map((p) => (
        <Part part={p} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default NumberForm;
