const { Genre } = require("../DB_connection");
const axios = require("axios");

const getGenres = async (req, res) => {
  res.status(200).send("get genres");
};

module.exports = getGenres;
