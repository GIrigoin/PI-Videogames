import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/actions";
import ModalDialog from "../../components/ModalDialog/ModalDialog";
import axios from "axios";

const Detail = () => {
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
        dispatch(setModal({ show: false }));
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
    <div>
      {game.name && (
        <div>
          <h1>{game.name}</h1>

          <div>
            <img src={game.background_image} alt={game.name} />
          </div>

          <div>
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
          </div>

          <div>
            <h2>
              <span>ID: </span>
              <span>{game.id}</span>
            </h2>
          </div>

          <div>
            <h2>Rating</h2>
            <h3>{game.rating}</h3>
          </div>

          <div>
            <h2>Release Date</h2>
            <h3>{game.released}</h3>
          </div>

          <div>
            <h2>Platforms:</h2>
            <ul>
              {game.platforms.map((platform) => (
                <li>{platform}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Genres:</h2>
            <ul>
              {game.genres.map((genre) => (
                <li>{genre.name}</li>
              ))}
            </ul>
          </div>
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
