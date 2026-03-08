const Filter = ({ setFilterValue }) => {
  return (
    <div>
      filter shown with{" "}
      <input onChange={(event) => setFilterValue(event.target.value)} />
    </div>
  );
};

export default Filter;
