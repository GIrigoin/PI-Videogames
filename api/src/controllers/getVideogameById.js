const { Videogame, Genre } = require("../DB_connection");
const axios = require("axios");
const { APIKEY } = process.env;
const URL = "https://api.rawg.io/api/games";

const getVideogameById = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    //Hay dos tipos de ID distintos, los de la BD son uuid (string- 32 digitos hexa y 4 separadores ) y los id de la API son numericos

    //Si es de la DB
    if (idVideogame.length === 36) {
      const gameDb = await Videogame.findOne({
        where: { id: idVideogame },
        include: {
          model: Genre,
          as: "genres",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      });
      if (!gameDb)
        return res.status(404).send("There is no game with the received Id");
      return res.json(gameDb);
    }

    //Si el id es de la API
    const { data } = await axios(`${URL}/${idVideogame}?key=${APIKEY}`);
    let {
      id,
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    } = data;
    //Reformatear platforms
    platforms = platforms.map((element) => element.platform.name);

    const gameAPI = {
      id,
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres,
    };
    return res.json(gameAPI);
  } catch (error) {
    if (error.response && error.response.status === 404)
      return res.status(404).send("There is no game with the received Id");
    res.status(500).send(error.message);
  }
};

module.exports = getVideogameById;
