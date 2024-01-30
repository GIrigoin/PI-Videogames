import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, name, background_image, userCreated, genres }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${id}`);
  };
  //No olvidar la funcion de borrado de juego
  return (
    <div onClick={handleClick}>
      <h2>{name}</h2>

      <div>
        <img src={background_image} alt={name} width="150px" />
      </div>
      <div>
        <h3>Genres</h3>
        <ul>
          {genres.map((genre) => (
            <li>{genre.name}</li>
          ))}
        </ul>
      </div>

      {userCreated ? <button>borrar</button> : null}
    </div>
  );
};

export default Card;
