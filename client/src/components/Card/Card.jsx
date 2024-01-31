import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadGames } from "../../redux/actions";

const Card = ({ id, name, background_image, userCreated, genres, rating }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${id}`);
  };
  //No olvidar la funcion de borrado de juego
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    const endpoint = "http://localhost:3001/videogames";
    await axios.delete(`${endpoint}/${id}`);
    dispatch(loadGames());
  };

  return (
    <div>
      <h2 onClick={handleClick}>{name}</h2>

      <div>
        <img src={background_image} alt={name} width="150px" />
      </div>
      <h2>{`Rating: ${rating}`}</h2>
      <div>
        <h3>Genres</h3>
        <ul>
          {genres.map((genre) => (
            <li>{genre.name}</li>
          ))}
        </ul>
      </div>

      {userCreated ? <button onClick={handleDeleteClick}>Delete</button> : null}
    </div>
  );
};

export default Card;
