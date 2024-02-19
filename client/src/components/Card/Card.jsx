import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadGames, setModal } from "../../redux/actions";
import styles from "./Card.module.css";
import noimage from "../../assets/noimage.svg";

const Card = ({ id, name, background_image, userCreated, genres, rating }) => {
  const image = background_image || noimage;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${id}`);
  };
  //No olvidar la funcion de borrado de juego
  const dispatch = useDispatch();

  const handleDeleteClick = async (event) => {
    event.stopPropagation();
    const endpoint = "http://localhost:3001/videogames";
    try {
      await axios.delete(`${endpoint}/${id}`);
      dispatch(loadGames());
      dispatch(
        setModal({
          show: true,
          type: "success",
          message: "Game deleted from DB",
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

  return (
    <div onClick={handleClick} className={styles.divCard}>
      <p className={styles.name}>{name}</p>

      <div className={styles.divImageRating}>
        {/* <div className={styles.divImage}> */}
        {/* {background_image && ( */}
        <img src={image} alt={name} className={styles.gameImage} />
        {/* )} */}
        {/* </div> */}
        <div className={styles.divRating}>
          <h3 className={styles.minorTitle}>Rating</h3>
          <p className={styles.pRating}>{rating}</p>
        </div>
      </div>

      {genres.length > 0 && (
        <div>
          <h3 className={styles.minorTitle}>Genres</h3>
          <ul>
            {genres.map((genre) => (
              <li className={styles.genreItem}>{genre.name}</li>
            ))}
          </ul>
        </div>
      )}

      {userCreated ? (
        <button onClick={handleDeleteClick} className={styles.buttons}>
          <span className={styles.spanButtons}>Delete</span>
        </button>
      ) : null}
    </div>
  );
};

export default Card;
