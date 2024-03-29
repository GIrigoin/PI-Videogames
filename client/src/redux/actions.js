import {
  LOAD_GAMES,
  FILTER,
  ORDER,
  LOAD_GENRES,
  SEARCH_BY_NAME,
  SET_MODAL,
} from "./actionTypes";
import axios from "axios";

const loadGames = () => {
  const endpoint = "http://localhost:3001/videogames";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({ type: LOAD_GAMES, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

const filterGames = ({ genre, userCreated }) => {
  return {
    type: FILTER,
    payload: { genre, userCreated },
  };
};

const orderGames = ({ criteria, order }) => {
  return {
    type: ORDER,
    payload: { criteria, order },
  };
};

const loadGenres = () => {
  const endpoint = "http://localhost:3001/genres";
  return async (dispatch) => {
    try {
      const { data } = await axios(endpoint);
      return dispatch({ type: LOAD_GENRES, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

const searchByName = (name) => {
  const endpoint = "http://localhost:3001/videogames";
  return (dispatch) => {
    axios(`${endpoint}?name=${name}`)
      .then(({ data }) => {
        return dispatch({ type: SEARCH_BY_NAME, payload: data });
      })
      .catch((error) => {
        dispatch(
          setModal({ show: true, type: "error", message: error.response.data })
        );
        setTimeout(() => {
          dispatch(setModal({ show: false }));
        }, 2000);
      });
  };
};

const setModal = ({ show, message, type }) => {
  return {
    type: SET_MODAL,
    payload: { show, message, type },
  };
};

export {
  loadGames,
  filterGames,
  orderGames,
  loadGenres,
  searchByName,
  setModal,
};
