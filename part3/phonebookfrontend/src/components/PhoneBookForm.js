import React from "react";

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

export default PhoneBookForm;
