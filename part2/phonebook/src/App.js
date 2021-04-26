import React, { useState } from "react";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      {" "}
      {part.name} - {part.number}
    </div>
  );
};

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

const PhoneBookForm = ({
  newName,
  newNumber,
  handleNumberChange,
  handleNameChange,
  handleClick,
}) => {
  return (
    <div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleClick = (event) => {
    event.preventDefault();

    if (persons.find((n) => n.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`);
      setNewName("");
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PhoneBookForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={handleClick}
      />
      <NumberForm persons={persons} newFilter={newFilter} />
    </div>
  );
};

export default App;
