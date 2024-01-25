const { Videogame, Genre } = require("../DB_connection");
const axios = require("axios");

// * GET | /videogames
// Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
//! IMPORTANTE: debido a que en la API existen alrededor de 500.000 videojuegos, por cuestiones de performance puedes tomar la simplificación de obtener y paginar los primeros 100 videojuegos.

// * GET | /videogames/name?="..."
// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

const getVideogames = async (req, res) => {
  const { APIKEY } = process.env;
  const URL = "https://api.rawg.io/api/games";

  //!Cambiar a 100 cuando funcione
  const MAXRESULTS = 10;
  const MAXRESULTSQUERY = 15;
  const { name } = req.query;
  try {
    //* Solo enviar id, name, genres, image y agrego un flag userCreated
    //GET videogames
    if (!name) {
      //Traer los juegos de la DB, con los generos asociados
      const gamesDb = await Videogame.findAll({
        atributes: ["id", "name", "background_image"],
        include: {
          model: Genre,
          as: "genres",
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
        };
      });

      const allGames = [...gamesDb, ...gamesApi];
      if (allGames.length < 1) return res.status(404).send("Games not Found");
      return res.json(allGames);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getVideogames;
