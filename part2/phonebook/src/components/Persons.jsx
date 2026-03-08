const Persons = ({ phoneBook, filter }) => {
  return (
    <div>
      <ul>
        {phoneBook.map(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) && (
              <li key={crypto.randomUUID()}>
                {person.name} {person.phone}
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default Persons;
