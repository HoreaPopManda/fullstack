import { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [phoneBook, setPhoneBook] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "John Coy", phone: "040-654321" },
    { name: "Iliuta Curmezan", phone: "040-987654" },
  ]);
  const [filter, setFilter] = useState("");

  const setFilterValue = (value) => {
    console.log("setfilter " + value);

    setFilter(value);
  };

  const addPerson = (person) => {
    setPhoneBook(phoneBook.concat(person));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterValue={setFilterValue} />
      <h3>Add a new</h3>
      <PersonForm phoneBook={phoneBook} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons phoneBook={phoneBook} filter={filter} />
    </div>
  );
};

export default App;
