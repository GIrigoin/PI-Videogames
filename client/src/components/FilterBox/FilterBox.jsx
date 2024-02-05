import { useSelector } from "react-redux";
import styles from "./FilterBox.module.css";

const FilterBox = ({ filters, handleFiltersChange }) => {
  const genres = useSelector((state) => state.genres);

  return (
    <div>
      <div className={styles.divTitle}>Filter by:</div>
      <div className={styles.divFilters}>
        <label>Genre: </label>
        <select
          name="genre"
          onChange={handleFiltersChange}
          value={filters.genre}
          className={styles.selectFilters}
        >
          <option value="All">All</option>
          {genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div className={styles.divFilters}>
        <label>From DB or API: </label>
        <select
          name="userCreated"
          onChange={handleFiltersChange}
          value={filters.userCreated}
          className={styles.selectFilters}
        >
          <option value="All">All</option>
          <option value={1}>From DB</option>
          <option value={0}>From API</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBox;
