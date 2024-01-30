const { Videogame } = require("../DB_connection");

const updateVideogame = async (req, res) => {
  //   const { name } = req.params;
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
    if (!name) return res.status(400).send("Game's name is required");

    //Ver que haya un juego con ese nombre y de paso guardar la instancia para añadir generos (si hay) en la tabla intermedia
    const updatedVideogame = await Videogame.findOne({ where: { name } });
    if (!updatedVideogame) return res.status(404).send("Game not found");

    let attributes = {};

    if (description) attributes = { ...attributes, description };
    if (platforms) attributes = { ...attributes, platforms };
    if (background_image) attributes = { ...attributes, background_image };
    if (released) attributes = { ...attributes, released };
    if (rating) attributes = { ...attributes, rating };
    console.log(Object.keys(attributes));

    await updatedVideogame.update(attributes, {
      where: {
        name,
      },
      fields: Object.keys(attributes),
    });

    if (genres) {
      await updatedVideogame.setGenres(genres);
    }

    return res.send("Game's info updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = updateVideogame;
