const Persons = ({ phoneBook }) => {
  return (
    <div>
      <ul>
        {phoneBook.map((person) => (
          <li key={crypto.randomUUID()}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
