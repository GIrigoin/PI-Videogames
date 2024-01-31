const { Videogame, Genre } = require("../DB_connection");
const { Op } = require("sequelize");
const axios = require("axios");

const getVideogames = async (req, res) => {
  const { APIKEY } = process.env;
  const URL = "https://api.rawg.io/api/games";

  //!Cambiar a 100 cuando funcione
  const MAXRESULTS = 100;
  const MAXRESULTSQUERY = 15;
  const { name } = req.query;
  try {
    //* Solo enviar id, name, genres, image y userCreated
    if (!name) {
      //GET videogames
      //Traer los juegos de la DB, con los generos asociados
      const gamesDb = await Videogame.findAll({
        attributes: ["id", "name", "background_image", "rating", "userCreated"],
        include: {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });

      //Traer los juegos de la API (100)
      const { data } = await axios(
        `${URL}?page=1&page_size=${MAXRESULTS}&key=${APIKEY}`
      );
      // Los juegos estan en data.results, mapear estos al formato para devolver
      const gamesApi = data.results.map((game) => {
        return {
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          genres: game.genres,
          rating: game.rating,
          userCreated: false,
        };
      });

      const allGames = [...gamesDb, ...gamesApi];
      if (allGames.length < 1) return res.status(404).send("Games not found");
      return res.status(200).json(allGames);
    } else {
      //GET videogames?name=...
      const gamesDb2 = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        attributes: ["id", "name", "background_image", "rating", "userCreated"],
        include: {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
        limit: MAXRESULTSQUERY,
      });
      if (MAXRESULTSQUERY - gamesDb2.length > 0) {
        const { data } = await axios(
          `${URL}?page=1&page_size=${
            MAXRESULTSQUERY - gamesDb2.length
          }&key=${APIKEY}&search=${name}`
        );

        var gamesApi2 = data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            genres: game.genres,
            rating: game.rating,
            userCreated: false,
          };
        });
      }
      const allGames2 = [...gamesDb2, ...gamesApi2];

      if (allGames2.length < 1) return res.status(404).send("Games not found");
      return res.json(allGames2);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getVideogames;
