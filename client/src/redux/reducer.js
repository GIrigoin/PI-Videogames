import {
  LOAD_GAMES,
  FILTER,
  ORDER,
  LOAD_GENRES,
  SEARCH_BY_NAME,
  SET_MODAL,
} from "./actionTypes";

const initialState = {
  allGames: [],
  showedGames: [],
  genres: [],
  modalDialog: {
    show: false,
    message: "",
    type: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAMES:
      return {
        ...state,
        allGames: action.payload,
        showedGames: action.payload,
      };
    case FILTER:
      const { genre, userCreated } = action.payload;
      //Primero el genero
      let filteredGamesByGenre =
        genre === "All"
          ? state.allGames
          : state.allGames.filter(
              (game) =>
                game.genres.findIndex(
                  (element) => element.id === parseInt(genre)
                ) > -1
            );

      //Segundo por creador
      let filteredGames =
        userCreated === "All"
          ? filteredGamesByGenre
          : filteredGamesByGenre.filter(
              (game) => game.userCreated == parseInt(userCreated)
            );

      //El resultado de los dos niveles de filtrado se copia en el estado
      return {
        ...state,
        showedGames: filteredGames,
      };

    case ORDER:
      const { criteria, order } = action.payload;
      const compareFn = (curr, next) => {
        let currCompItem;
        let nextCompItem;
        //definir los elementos a comparar segun el criterio
        if (criteria === "name") {
          currCompItem = curr.name.toUpperCase();
          nextCompItem = next.name.toUpperCase();
        } else if (criteria === "rating") {
          currCompItem = curr.rating;
          nextCompItem = next.rating;
        }
        // Usar estos elementos para generar la ordenación en el sentido indicado por order
        if (order === "ASC") {
          if (currCompItem < nextCompItem) return -1;
          if (currCompItem > nextCompItem) return 1;
          return 0;
        }
        if (order === "DES") {
          if (currCompItem > nextCompItem) return -1;
          if (currCompItem < nextCompItem) return 1;
          return 0;
        }
      };
      const sortedGames = state.showedGames.toSorted(compareFn);
      return {
        ...state,
        showedGames: sortedGames,
      };

    case LOAD_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        showedGames: action.payload,
        allGames: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        modalDialog: action.payload,
      };
    default:
      return { ...state };
  }
};
export default reducer;
