import { useSelector } from "react-redux";

const FilterBox = ({ filters, handleFiltersChange }) => {
  const genres = useSelector((state) => state.genres);

  return (
    <div>
      <div>Filter by:</div>
      <div>
        <label>Genre: </label>
        <select
          name="genre"
          onChange={handleFiltersChange}
          value={filters.genre}
        >
          <option value="All">All</option>
          {genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>From DB or API: </label>
        <select
          name="userCreated"
          onChange={handleFiltersChange}
          value={filters.userCreated}
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
