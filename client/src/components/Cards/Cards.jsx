import React from "react";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const showedGames = useSelector((state) => state.showedGames);

  //esto de aca abajo va a cambiar con el paginado
  const cards = showedGames.map((game) => {
    return <Card {...game} />;
  });

  return <div>{cards}</div>;
};

export default Cards;
