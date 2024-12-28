const Search = ({ newCountrie, handle }) => {
  return (
    <>
      find countries{' '}
      <input
        type="text"
        value={newCountrie}
        onChange={handle}
        placeholder="write a countrie"
      />
    </>
  );
};

export default Search;
