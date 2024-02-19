import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName, loadGames } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBox.module.css";

const SearchBox = ({ resetFilters, resetOrder }) => {
  const navigate = useNavigate();
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
    <div className={styles.divSearchBox}>
      <div className={styles.divSearch}>
        <input
          type="text"
          placeholder="Type the name of the game"
          value={name}
          onChange={handleChange}
          className={styles.searchInput}
        />
        <button
          disabled={name.length < 2}
          onClick={handleClick}
          className={styles.buttons}
        >
          <span className={styles.spanButtons}>Search</span>
        </button>
      </div>
      <div className={styles.divNavigate}>
        <button onClick={handleResetClick} className={styles.buttons}>
          <span className={styles.spanButtons}>All Games</span>
        </button>
        <button
          onClick={() => {
            navigate("/addgame");
          }}
          className={styles.buttons}
        >
          <span className={styles.spanButtons}>Add Game to DB</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
