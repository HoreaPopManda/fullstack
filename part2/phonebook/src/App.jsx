import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const setFilterValue = (value) => {
    console.log("setfilter " + value);

    setFilter(value);
  };

  const addPerson = (person) => {
    setPersons(persons.concat(person));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterValue={setFilterValue} />
      <h3>Add a new</h3>
      <PersonForm phoneBook={persons} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons phoneBook={persons} filter={filter} />
    </div>
  );
};

export default App;
