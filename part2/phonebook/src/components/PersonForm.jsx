import { useState } from "react";

const PersonForm = ({ phoneBook, addPerson }) => {
  const [persons, setPersons] = useState(phoneBook);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onChangeName = (event) => {
    // onsole.log(event.target.value);
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const isValidPhoneNumber = (input) => {
    // Regex explanation:
    // only allows digits and dashes, with a length of 1 to 10 characters
    const regex = /^[0-9-]{1,10}$/;

    return regex.test(input);
  };

  const onClick = (event) => {
    event.preventDefault();

    const personAlreadyIn = persons.find((person) => person.name === newName);

    if (personAlreadyIn) {
      window.alert(`${newName} already in phonebook`);
      setNewName("");
      return;
    }

    if (!isValidPhoneNumber(newNumber)) {
      window.alert(`${newNumber} is not a valid phone number`);
      setNewNumber("");
      return;
    }

    const newContact = { name: newName, phone: newNumber };
    addPerson(newContact);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <form>
        <div>
          name: <input onChange={onChangeName} value={newName} />
        </div>
        <div>
          number: <input onChange={onChangeNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit" onClick={onClick}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
