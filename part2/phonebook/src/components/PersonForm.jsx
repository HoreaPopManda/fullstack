import { useState } from "react";

const PersonForm = ({ phoneBook, addPerson, updatePerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onChangeName = (event) => {
    // console.log(`Name: ${event.target.value}`);
    setNewName(event.target.value);
  };

  const onChangeNumber = (event) => {
    // console.log(`Number: ${event.target.value}`);
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

    if (!isValidPhoneNumber(newNumber)) {
      window.alert(`${newNumber} is not a valid phone number`);
      setNewNumber("");
      return;
    }

    const personAlreadyIn = phoneBook.find((p) => p.name === newName);

    if (personAlreadyIn) {
      if (
        window.confirm(
          `${newName} already in phonebook. Do you want to replace the old number with a new one?`,
        )
      ) {
        const updatedPerson = { ...personAlreadyIn, number: newNumber };

        updatePerson(updatedPerson);

        setNewName("");
        setNewNumber("");
      } else {
        return;
      }
    } else {
      const newContact = { name: newName, number: newNumber };
      addPerson(newContact);
      setNewName("");
      setNewNumber("");
    }
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
