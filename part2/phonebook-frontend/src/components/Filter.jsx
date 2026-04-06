const Filter = ({ setFilterValue }) => {
  return (
    <div>
      names with{" "}
      <input onChange={(event) => setFilterValue(event.target.value)} />
    </div>
  );
};

export default Filter;
