import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName, loadGames } from "../../redux/actions";

const SearchBox = ({ resetFilters, resetOrder }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    dispatch(searchByName(name));
    resetFilters();
    resetOrder();
  };
  const handleResetClick = () => {
    dispatch(loadGames());
    resetFilters();
    resetOrder();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write the name of the game"
        value={name}
        onChange={handleChange}
      />
      <button disabled={name.length < 2} onClick={handleClick}>
        Search
      </button>
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

export default SearchBox;
