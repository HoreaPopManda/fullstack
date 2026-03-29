const Persons = ({ phoneBook, filter, deletePerson }) => {
  return (
    <div>
      <ul>
        {phoneBook.map(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) && (
              <li key={crypto.randomUUID()}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>delete</button>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Persons;
