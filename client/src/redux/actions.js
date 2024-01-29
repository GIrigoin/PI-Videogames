import { LOAD_GAMES, FILTER, ORDER } from "./actionTypes";
import axios from "axios";

//loadGames
const loadGames = () => {
  const endpoint = "http://localhost:3001/videogames";
  return async (dispatch) => {
    try {
      const { data } = axios(endpoint);
      return dispatch({ type: LOAD_GAMES, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

const filterGames = (genre, userCreated) => {
  return {
    type: FILTER,
    payload: { genre, userCreated },
  };
};

const orderGames = (criteria, order) => {
  return {
    type: ORDER,
    payload: { criteria, order },
  };
};

//falta paginado

export { loadGames, filterGames, orderGames };
