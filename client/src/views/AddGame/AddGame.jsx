import { useDispatch, useSelector } from "react-redux";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { setModal } from "../../redux/actions";
import { useState } from "react";

const AddGame = () => {
  const dispatch = useDispatch();
  const modalDialog = useSelector((state) => state.modalDialog);
  const genres = useSelector((state) => state.genres);
  //Estados y funciones asociados al formulario y la validacion
  const initialGameform = {
    name: "", // Obligatorio (no nulo) todo vale como nombre de juego
    image: "", //debe ser una url, opcional
    description: "", //obligatorio, min 50 caracteres
    platforms: [], //opcional, las entradas deben ser no nulas
    released: "", //opcional, fecha YYYY-MM-DD
    rating: "", //obligatorio, min=0 max=5
    genres: [], //opcional
  };
  const initialErrors = {
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
  };
  const [gameForm, setGameForm] = useState(initialGameform);
  const [errors, setErrors] = useState(initialErrors);
  const [platform, setPlatform] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameForm({ ...gameForm, [name]: value });
  };
  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const handlePlatformsClick = (event) => {
    event.preventDefault();
    const platforms = gameForm.platforms;
    platforms.push(platform);
    setGameForm({ ...gameForm, platforms });
  };

  const handleDelPlatformsClick = (event) => {
    event.preventDefault();
    const platforms = gameForm.platforms.filter(
      (platform) => platform !== event.target.name
    );
    setGameForm({ ...gameForm, platforms });
  };

  const handleGenresCBChange = (event) => {
    const { name, checked } = event.target;
    let genres = gameForm.genres;
    if (checked) {
      if (!genres.includes(name)) genres.push(name);
    } else {
      genres = gameForm.genres.filter((genre) => genre !== name);
    }
    setGameForm({ ...gameForm, genres });
  };

  //Control del dialog box
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  return (
    <div>
      {/* <button onClick={handleOpenModal}>Abrir</button> */}
      <div>
        <h1>Add Game Info</h1>
      </div>
      <form action="">
        <fieldset>
          <legend htmlFor="">Name: </legend>
          <input
            type="text"
            name="name"
            value={gameForm.name}
            onChange={handleChange}
          />
          <p>{errors.name}</p>
        </fieldset>
        <fieldset>
          <legend htmlFor="">Image: </legend>
          <input
            type="text"
            name="image"
            value={gameForm.image}
            onChange={handleChange}
          />
          <p>{errors.image}</p>
        </fieldset>
        <fieldset>
          <legend htmlFor="">Release date: </legend>
          <input
            type="date"
            name="released"
            value={gameForm.released}
            onChange={handleChange}
          />
          <p>{errors.released}</p>
        </fieldset>
        <fieldset>
          <legend htmlFor="">Rating: </legend>
          <input
            type="range"
            name="rating"
            min="0"
            max="5"
            step="0.5"
            value={gameForm.rating}
            onChange={handleChange}
          />
          <p>{gameForm.rating}</p>
        </fieldset>
        <fieldset>
          <legend>Platforms: </legend>
          <div>
            <input
              type="text"
              name="platform"
              value={platform}
              onChange={handlePlatformChange}
            />
            <button name="platforms" onClick={handlePlatformsClick}>
              Add
            </button>
            <p>{errors.platforms}</p>
          </div>
          <ul>
            {gameForm.platforms.map((platform) => (
              <div>
                <li>{platform}</li>
                <button name={platform} onClick={handleDelPlatformsClick}>
                  ❌
                </button>
              </div>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <legend>Genres: </legend>

          {genres.map((genre) => (
            <label>
              <input
                type="checkbox"
                name={genre.id}
                value={genre.name}
                onChange={handleGenresCBChange}
              />
              {genre.name}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Description: </legend>
          <textarea
            name="description"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          <p>{errors.description}</p>
        </fieldset>
        <div>
          <button type="submit">Add to DB</button>
        </div>
      </form>

      {/* <ModalDialog
        show={modalDialog.show}
        type={modalDialog.type}
        message={modalDialog.message}
        handleNoClick={handleNoClick}
        handleYesClick={handleYesClick}
      /> */}
    </div>
  );
};

export default AddGame;

// const handleOpenModal = () => {
//   dispatch(
//     setModal({
//       show: true,
//       type: "confirmation",
//       message: "Soy un dialogbox!",
//     })
//   );
//   //   await setTimeout(() => {
//   //     dispatch(setModal({ show: false }));
//   //   }, 2000);
// };
// const handleYesClick = async () => {
//   dispatch(
//     setModal({
//       show: true,
//       type: "success",
//       message: "apretaste yes. YEEEEEAAHHHH!",
//     })
//   );
//   await setTimeout(() => {
//     dispatch(setModal({ show: false }));
//   }, 2000);
// };

// const handleNoClick = () => {
//   dispatch(setModal({ show: false }));
// };
