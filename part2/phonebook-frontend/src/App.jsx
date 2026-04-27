import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";
import RefreshPhoneBook from "./components/RefreshPhoneBook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ text: null, type: null });

  const [pickedName, setPickedName] = useState("");
  const [pickedNumber, setPickedNumber] = useState("");


  const handlePicked = (newPickedName, newPickedNumber) => {
    setPickedName(newPickedName)
    setPickedNumber(newPickedNumber)
  };

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
    personService.createOrUpdateIfExists(person)
    .then((response) => {
      const returnedPerson = response.data;
      console.log(`response.status when adding a person: ${response.status}`);
      if (response.status === 200) {
        setPersons(persons.concat(response.data));

        setMessage({ text: `Added ${returnedPerson.name}`, type: "info" });
      } 
      else if (response.status === 201) {
          setPersons(
            persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p)),
          );
          setMessage({ text: `Updated ${returnedPerson.name}`, type: "info" });
      }
      else {
          setMessage({ text: `Failed to add or update ${returnedPerson.name}`, type: "error" });
      }
      setTimeout(() => {
        setMessage({ text: null, type: null });
        }, 5000);
    })
    .catch((error) => {
        setMessage({
          text: error.response.data.error || `Failed to update ${person.name}`,
          type: "error",
          });
        
        setTimeout(() => {
          setMessage({ text: null, type: null });
          }, 5000);
    })
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
    personService.updatePerson(person)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === returnedPerson.id ? returnedPerson : p)),
        );
        setMessage({ text: `Updated ${returnedPerson.name}`, type: "info" });

        setTimeout(() => {
          setMessage({ text: null, type: null });
        }, 5000);
      })
      .catch((error) => {
        setMessage({
          text: error.response.data.error || `Failed to update ${person.name}`,
          type: "error",
          });

        setTimeout(() => {
          setMessage({ text: null, type: null });
          }, 5000);
      })
  };

  const refreshPhoneBook = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };


  const pickPerson = (name, number) => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };

  return (
    <div>
      <h2>Phonebook {persons ? `(${persons.length})` : ""}</h2>
      <RefreshPhoneBook refreshPhoneBook={refreshPhoneBook} />
      <Notification message={message.text} type={message.type} />
      <Filter setFilterValue={setFilterValue} />
      <h3>Add a new</h3>
      <PersonForm
        phoneBook={persons}
        addPerson={addPerson}
        updatePerson={updatePerson}
        pickedName={pickedName}
        pickedNumber={pickedNumber}
      />
      <h2>Numbers</h2>
      <Persons
        phoneBook={persons}
        filter={filter}
        deletePerson={deletePerson}
        pickPerson={handlePicked}
      />
    </div>
  );
};

export default App;