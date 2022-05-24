const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="search for movies..."
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default SearchBox;
