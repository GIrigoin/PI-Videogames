const { Genre } = require("../DB_connection");
const axios = require("axios");

const getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({ attributes: ["id", "name"] });
    if (!genres) return res.status(404).send("No se encontró ningún género");
    return res.json(genres);
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.status(200).send("get genres");
};

module.exports = getGenres;
