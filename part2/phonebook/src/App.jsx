import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const setFilterValue = (value) => {
    console.log("setfilter " + value);

    setFilter(value);
  };

  const addPerson = (person) => {
    personService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const updatePerson = (person) => {
    personService.updatePerson(person).then((returnedPerson) => {
      setPersons(
        persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p)),
      );
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterValue={setFilterValue} />
      <h3>Add a new</h3>
      <PersonForm
        phoneBook={persons}
        addPerson={addPerson}
        updatePerson={updatePerson}
      />
      <h2>Numbers</h2>
      <Persons
        phoneBook={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
