const { Genre } = require("../DB_connection");

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({ attributes: ["id", "name"] });
    if (!genres) return res.status(404).send("No se encontró ningún género");
    return res.json(genres);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getGenres;
