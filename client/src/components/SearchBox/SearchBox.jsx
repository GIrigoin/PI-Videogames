import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../redux/actions";

const SearchBox = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = () => {
    dispatch(searchByName(name));
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
    </div>
  );
};

export default SearchBox;
