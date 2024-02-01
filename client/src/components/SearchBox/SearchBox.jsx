import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName, loadGames, setModal } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import ModalDialog from "../ModalDialog/ModalDialog";

const SearchBox = ({ resetFilters, resetOrder }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const dialog = useSelector((state) => state.modalDialog);
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
        placeholder="Type the name of the game"
        value={name}
        onChange={handleChange}
      />
      <button disabled={name.length < 2} onClick={handleClick}>
        Search
      </button>
      <button onClick={handleResetClick}>All Games</button>
      <button
        onClick={() => {
          navigate("/addgame");
        }}
      >
        Add Game to DB
      </button>
      <ModalDialog
        show={dialog.show}
        type={dialog.type}
        message={dialog.message}
      />
    </div>
  );
};

export default SearchBox;
