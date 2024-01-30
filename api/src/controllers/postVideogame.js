const { Videogame } = require("../DB_connection");

const postVideogame = async (req, res) => {
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres,
  } = req.body;
  try {
    if (!name || !description || !rating)
      return res.status(400).send("Missing datafields");

    const defaults = {
      description,
      rating,
    };

    if (platforms) defaults.platforms = platforms;
    if (background_image) defaults.background_image = background_image;
    if (released) defaults.released = released;

    const [newGame, created] = await Videogame.findOrCreate({
      where: { name },
      defaults,
    });

    if (!created) return res.status(400).send("The game is already stored");

    //Añadir los generos a la tabla intermedia
    await newGame.addGenres(genres);

    return res.status(201).send("Game successfully added");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = postVideogame;
