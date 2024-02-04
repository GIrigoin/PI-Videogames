import { useDispatch, useSelector } from "react-redux";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import { setModal } from "../../redux/actions";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddGame = () => {
  const navigate = useNavigate();
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  //Estados y funciones asociados al formulario y la validacion
  const genres = useSelector((state) => state.genres);
  const initialGameform = {
    name: "", // Obligatorio (no nulo) todo vale como nombre de juego
    background_image: "", //debe ser una url, opcional
    description: "", //obligatorio, min 50 caracteres
    platforms: [], //opcional, las entradas deben ser no nulas
    released: "", //opcional, fecha YYYY-MM-DD
    rating: 2.5, //obligatorio, min=0 max=5
    genres: [], //opcional
  };
  const initialErrors = {
    name: "Required",
    background_image: "",
    description: "Required",
    released: "",
    rating: "Required",
  };
  const [gameForm, setGameForm] = useState(initialGameform);
  const [errors, setErrors] = useState(initialErrors);
  const [platform, setPlatform] = useState("");
  const [platformError, setPlatformError] = useState("");
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
      case "background_image":
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
      case "platform":
        const platformWords = value.split(" ");
        if (!value) return "You can't add empty texts as a platform name";
        if (!platformWords.every((word) => word.length > 0))
          return "Invalid use of spaces";
        if (!nameRegex.test(value))
          return "Platform name only could contain alphanumeric characters or @ ( ) & ' . _ - ! ?";
        return "";
      default:
        break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errorMessage = validate(name, value);
    if (name === "platform") {
      setPlatform(event.target.value);
      setPlatformError(errorMessage);
      return;
    }
    setGameForm({ ...gameForm, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    const errorMessages = Object.values(errors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  };

  const handlePlatformsClick = (event) => {
    event.preventDefault();
    if (!gameForm.platforms.includes(platform) && platform) {
      const platforms = gameForm.platforms;
      platforms.push(platform);
      setGameForm({ ...gameForm, platforms });
      setPlatform("");
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

  //Control del  submit y dialog box
  const dispatch = useDispatch();
  const modalDialog = useSelector((state) => state.modalDialog);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Formateo description como los que envia la api (HTML)
    const description = `<p>${gameForm.description}</p>`;
    setGameForm({ ...gameForm, description });

    try {
      // Con el formulario listo primero verifico si el juego existe
      // Entonces 1º busco por name
      const endpoint = "http://localhost:3001/videogames";
      const { data } = await axios(`${endpoint}?name=${gameForm.name}`);
      // 2º Busco coincidencia exacta en los resultados
      const sameNameGame = data.find(
        (game) => game.name.toUpperCase() === gameForm.name.toUpperCase()
      );
      // 3º Si NO hay coincidencia: Crear la entrada en la DB
      if (!sameNameGame) {
        await axios.post(endpoint, gameForm);
        dispatch(
          setModal({
            show: true,
            type: "success",
            message: "Game added to the DB",
          })
        );
        setTimeout(() => {
          dispatch(setModal({ show: false }));
        }, 2000);
      } else {
        // 4º Si hay coincidencia: si proviene de la api informar que ya existe y no se puede modificar
        if (!sameNameGame.userCreated) {
          dispatch(
            setModal({
              show: true,
              type: "error",
              message: "Game is already in the API",
            })
          );
          setTimeout(() => {
            dispatch(setModal({ show: false }));
          }, 2000);
          return;
        } else {
          // 5º Si hay coincidencia: si proviene de la DB: informar que el juego ya está registrado y preguntar si quiere actualizar dicho registro con la informacion nueva. En caso afirmativo informar el resultado y resetear el formulario, sino volver al formulario.
          dispatch(
            setModal({
              show: true,
              type: "confirmation",
              message: "Game is already in the DB. Update with the new info?",
            })
          );
          //El flujo sigue en la logica de los botones del dialogo (SI - NO)
        }
      }
    } catch (error) {
      dispatch(
        setModal({ show: true, type: "error", message: error.response.data })
      );
      setTimeout(() => {
        dispatch(setModal({ show: false }));
      }, 2000);
    }
  };
  const handleYesClick = async () => {
    const endpoint = "http://localhost:3001/videogames";
    try {
      await axios.put(endpoint, gameForm);
      dispatch(
        setModal({
          show: true,
          type: "success",
          message: "Game's info updated",
        })
      );
      setTimeout(() => {
        dispatch(setModal({ show: false }));
      }, 2000);
    } catch (error) {
      dispatch(
        setModal({ show: true, type: "error", message: error.response.data })
      );
      setTimeout(() => {
        dispatch(setModal({ show: false }));
      }, 2000);
    }
  };
  const handleNoClick = () => {
    dispatch(setModal({ show: false }));
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
            required={true}
          />
          <span> *</span>
          <p>{errors.name}</p>
        </fieldset>
        <fieldset>
          <legend>Image: </legend>
          <input
            type="text"
            name="background_image"
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
            required={true}
          />
          <p>{errors.rating}</p>
        </fieldset>
        <fieldset>
          <legend>Platforms: </legend>
          <div>
            <input
              type="text"
              name="platform"
              value={platform}
              onChange={handleChange}
            />
            <button
              name="platforms"
              onClick={handlePlatformsClick}
              disabled={platformError !== ""}
            >
              Add
            </button>
            <p>{platformError}</p>
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
            required={true}
          ></textarea>
          <span> *</span>
          <p>{errors.description}</p>
        </fieldset>
        <div>
          <button type="submit" disabled={disableSubmit}>
            Add to DB
          </button>
          <button onClick={handleHomeClick}>Back to Home</button>
        </div>
      </form>

      <ModalDialog
        show={modalDialog.show}
        type={modalDialog.type}
        message={modalDialog.message}
        handleNoClick={handleNoClick}
        handleYesClick={handleYesClick}
      />
    </div>
  );
};

export default AddGame;
