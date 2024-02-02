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
    rating: 2.5, //obligatorio, min=0 max=5
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
  const [disableSubmit, setDisableSubmit] = useState(true);

  const validate = (name, value) => {
    const nameRegex = /^[A-Za-z0-9@\s\-._()&!?']{1,100}$/;
    const urlRegex =
      /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
    const dateRegex =
      /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;

    switch (name) {
      case "name":
        const words = value.split(" ");
        if (!value) return "Name is required";
        if (!words.every((word) => word.length > 0))
          return "Invalid use of spaces";
        if (!nameRegex.test(value))
          return "Name only could contain alphanumeric characters or @ ( ) & ' . _ - ! ?";
        return "";
      case "image":
        if (!urlRegex.test(value)) return "Not a valid URL";
        return "";

      case "description":
        if (!value) return "A description is required (min. 50 characters)";
        if (value.length < 50) return "Minimun 50 characters";
        return "";
      case "released":
        const year = value.split("-")[0];
        if (parseInt(year) > 2050) return "The year must be lower than 2050";
        if (!dateRegex.test(value)) return "The date format must be YYYY-MM-DD";
        return "";
      case "rating":
        if (value < 0 || value > 5) return "Rating must be between 0 and 5";
        return "";
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameForm({ ...gameForm, [name]: value });
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
    const errorMessages = Object.values(errors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  };
  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
  };

  const handlePlatformsClick = (event) => {
    event.preventDefault();
    if (!gameForm.platforms.includes(platform) && platform) {
      const platforms = gameForm.platforms;
      platforms.push(platform);
      setGameForm({ ...gameForm, platforms });
    }
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const description = `<p>${gameForm.description}</p>`;
    setGameForm({ ...gameForm, description });
  };

  return (
    <div>
      {/* <button onClick={handleOpenModal}>Abrir</button> */}
      <div>
        <h1>Add Game Info</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Name: </legend>
          <input
            type="text"
            name="name"
            value={gameForm.name}
            onChange={handleChange}
            required="true"
          />
          <span> *</span>
          <p>{errors.name}</p>
        </fieldset>
        <fieldset>
          <legend>Image: </legend>
          <input
            type="text"
            name="image"
            value={gameForm.image}
            onChange={handleChange}
          />
          <p>{errors.image}</p>
        </fieldset>
        <fieldset>
          <legend>Release date: </legend>
          <input
            type="date"
            name="released"
            value={gameForm.released}
            onChange={handleChange}
          />
          <p>{errors.released}</p>
        </fieldset>
        <fieldset>
          <legend>Rating: </legend>

          <div>
            <span>0 </span>
            <input
              type="range"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              value={gameForm.rating}
              onChange={handleChange}
            />
            <span> 5 *</span>
          </div>
          <input
            type="text"
            name="rating"
            value={gameForm.rating}
            onChange={handleChange}
            required="true"
          />
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
          <span> *</span>
          <p>{errors.description}</p>
        </fieldset>
        <div>
          <button type="submit" disabled={disableSubmit}>
            Add to DB
          </button>
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
