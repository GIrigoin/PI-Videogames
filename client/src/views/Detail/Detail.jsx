import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import axios from "axios";
import styles from "./Detail.module.css";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dialog = useSelector((state) => state.modalDialog);
  const dispatch = useDispatch();
  const [game, setGame] = useState({});
  const endpoint = "http://localhost:3001/videogames/";

  useEffect(() => {
    const fetchGame = async () => {
      try {
        dispatch(
          setModal({
            show: true,
            type: "loading",
            message: "Loading game info...",
          })
        );
        const { data } = await axios(`${endpoint}${id}`);
        setGame(data);
        setTimeout(() => {
          dispatch(setModal({ show: false }));
        }, 500);
        // dispatch(setModal({ show: false }));
      } catch (error) {
        dispatch(
          setModal({ show: true, type: "error", message: error.response.data })
        );
        setTimeout(() => {
          dispatch(setModal({ show: false }));
        }, 2000);
      }
    };
    fetchGame();
  }, [id]);

  return (
    <div className={styles.divDetail}>
      {game.name && (
        <div className={styles.divContainer}>
          <div className={styles.h1Title}>
            <h1>{game.name}</h1>
          </div>
          <div>
            <h2>
              <span>ID: </span>
              <span>{game.id}</span>
            </h2>
          </div>
          <div className={styles.divSection}>
            {game.background_image && (
              <img
                src={game.background_image}
                alt={game.name}
                className={styles.gameImage}
              />
            )}
            <div>
              <fieldset className={styles.divProperty}>
                <legend className={styles.legendProperty}>Rating</legend>
                <h2>{game.rating}</h2>
              </fieldset>
              {game.released && (
                <fieldset className={styles.divProperty}>
                  <legend className={styles.legendProperty}>
                    Release Date
                  </legend>
                  <h2>{game.released}</h2>
                </fieldset>
              )}
            </div>
          </div>
          <div className={styles.divDescription}>
            <div
              dangerouslySetInnerHTML={{ __html: game.description }}
              className={styles.divDescriptionContent}
            ></div>
          </div>

          <div className={styles.divSection}>
            {game.genres.length > 0 && (
              <fieldset className={styles.divProperty}>
                <legend className={styles.legendProperty}>Genres:</legend>
                <ul>
                  {game.genres.map((genre) => (
                    <li>{genre.name}</li>
                  ))}
                </ul>
              </fieldset>
            )}

            {game.platforms.length > 0 && (
              <fieldset className={styles.divProperty}>
                <legend className={styles.legendProperty}>Platforms:</legend>
                <ul>
                  {game.platforms.map((platform) => (
                    <li>{platform}</li>
                  ))}
                </ul>
              </fieldset>
            )}
          </div>
          <button
            onClick={() => {
              navigate("/home");
            }}
            className={styles.buttons}
          >
            <span className={styles.spanButtons}>Home</span>
          </button>
        </div>
      )}

      <ModalDialog
        show={dialog.show}
        type={dialog.type}
        message={dialog.message}
      />
    </div>
  );
};

export default Detail;
