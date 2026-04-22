const Persons = ({ phoneBook, filter, deletePerson, pickPerson}) => {
  return (
    <div>
      <ul>
        {phoneBook.map(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) && (
            <li key={crypto.randomUUID()} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span>{person.name} {person.number}</span>
              <button onClick={() => deletePerson(person.id)}>delete</button>
              <button onClick={() => pickPerson(person.name, person.number)}>pick</button>
            </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Persons;
