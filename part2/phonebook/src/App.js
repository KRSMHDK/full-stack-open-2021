import React, { useState, useEffect } from "react";

import Filter from "./components/Filter";
import NumberForm from "./components/NumberForm";
import PhoneBookForm from "./components/PhoneBookForm";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const duplicateCheck = persons.find((person) => person.name === newName);

    if (persons.find((n) => n.name.toLowerCase() === newName.toLowerCase())) {
      const personPrompt = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one`
      );

      if (personPrompt === true) {
        personService
          .update(duplicateCheck.id, {
            name: newName,
            number: newNumber,
          })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== duplicateCheck.id ? person : response
              )
            );
            console.log(response);
          });
      }
      setNewName("");
      setNewNumber("");
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      personService.create(person).then((response) => {
        setMessageType("confirmation");
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
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

  const deletePerson = (event) => {
    const id = parseInt(event.target.value);
    const name = persons.find((f) => f.id === id).name;

    personService.deletePerson(id).catch((error) => {
      setMessageType("error");
      setMessage(`information of ${name} has already been removed from server`);
      setTimeout(() => {
        setMessage(null);
        setMessageType("error");
      }, 5000);
      setPersons(persons.filter((n) => n.id !== id));
    });
    setPersons(persons.filter((n) => n.id !== id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PhoneBookForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleClick={addPerson}
      />
      <NumberForm
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
