const Filter = ({ setFilterValue }) => {
  return (
    <div>
      countries with{" "}
      <input onChange={(event) => setFilterValue(event.target.value)} />
    </div>
  );
};

export default Filter;
