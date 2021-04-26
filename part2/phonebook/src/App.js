import React, { useState } from "react";

const Part = ({ part }) => {
  return <div> {part.name}</div>;
};

const NumberForm = ({ person }) => {
  return (
    <div>
      <h2>Numbers:</h2>
      {person.map((p) => (
        <Part part={p} />
      ))}
    </div>
  );
};

const PhoneBookForm = ({ newName, handleChange, handleClick }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleClick} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    if (persons.find((n) => n.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const person = {
        name: newName,
      };
      setPersons(persons.concat(person));
      setNewName("");
    }
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <PhoneBookForm
        newName={newName}
        handleChange={handleChange}
        handleClick={handleClick}
      />
      <NumberForm person={persons} />
    </div>
  );
};

export default App;
