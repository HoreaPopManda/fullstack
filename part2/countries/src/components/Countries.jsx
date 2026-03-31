const Countries = ({ countriesToDisplay }) => {
  if (!countriesToDisplay) {
    return null;
  }
  console.log(
    "countries in the list ",
    countriesToDisplay,
    countriesToDisplay[0]?.name.common,
  );

  return (
    <ul>
      {countriesToDisplay.map((c, index) => (
        <li key={index}>{c.name.common}</li>
      ))}
    </ul>
  );
};

export default Countries;
