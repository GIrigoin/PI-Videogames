import { LOAD_GAMES, FILTER, ORDER } from "./actionTypes";

const initialState = {
  allGames: [],
  showedGames: [],
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
      const { genre, useCreated } = action.payload;
      //Primero el genero
      let filteredGamesByGenre = "All"
        ? state.allGames
        : state.allGames.filter((game) =>
            game.genres.findIndex((element) => (element.id = genre))
          );

      //Segundo por creador
      let filteredGames = "All"
        ? filteredGamesByGenre
        : filteredGamesByGenre.filter((game) => game.useCreated === useCreated);

      //El resultado de los dos niveles de filtrado se copia en el estado
      return {
        ...state,
        showedGames: filteredGames,
      };

    case ORDER:
    default:
      return { ...state };
  }
};
export default reducer;
