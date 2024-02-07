import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadGames } from "../../redux/actions";
import styles from "./Card.module.css";

const Card = ({ id, name, background_image, userCreated, genres, rating }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${id}`);
  };
  //No olvidar la funcion de borrado de juego
  const dispatch = useDispatch();

  const handleDeleteClick = async (event) => {
    event.stopPropagation();
    const endpoint = "http://localhost:3001/videogames";
    await axios.delete(`${endpoint}/${id}`);
    dispatch(loadGames());
  };

  return (
    <div onClick={handleClick} className={styles.divCard}>
      <p className={styles.name}>{name}</p>

      <div className={styles.divImageRating}>
        {/* <div className={styles.divImage}> */}
        <img src={background_image} alt={name} className={styles.gameImage} />
        {/* </div> */}
        <div className={styles.divRating}>
          <h3 className={styles.minorTitle}>Rating</h3>
          <p className={styles.pRating}>{rating}</p>
        </div>
      </div>
      <div>
        <h3 className={styles.minorTitle}>Genres</h3>
        <ul>
          {genres.map((genre) => (
            <li className={styles.genreItem}>{genre.name}</li>
          ))}
        </ul>
      </div>

      {userCreated ? (
        <button onClick={handleDeleteClick} className={styles.buttons}>
          <span className={styles.spanButtons}>Delete</span>
        </button>
      ) : null}
    </div>
  );
};

export default Card;
