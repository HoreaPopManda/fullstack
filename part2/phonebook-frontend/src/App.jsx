import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ text: null, type: null });

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

      setMessage({ text: `Added ${returnedPerson.name}`, type: "info" });

      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({ text: `Deleted ${personToDelete.name}`, type: "info" });

          setTimeout(() => {
            setMessage({ text: null, type: null });
          }, 5000);
        })
        .catch((error) => {
          setMessage({
            text: `Information of ${personToDelete.name} has already been removed from server`,
            type: "error",
          });

          setTimeout(() => {
            setMessage({ text: null, type: null });
          }, 5000);
        });
    }
  };

  const updatePerson = (person) => {
    personService.updatePerson(person).then((returnedPerson) => {
      setPersons(
        persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p)),
      );
      setMessage({ text: `Updated ${returnedPerson.name}`, type: "info" });

      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.text} type={message.type} />
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
