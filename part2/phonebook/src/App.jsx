import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "John Coy", phone: "040-654321" },
    { name: "Iliuta Curmezan", phone: "040-987654" },
  ]);

  const addPerson = (person) => {
    setPhoneBook(phoneBook.concat(person));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm phoneBook={phoneBook} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons phoneBook={phoneBook} />
    </div>
  );
};

export default App;
