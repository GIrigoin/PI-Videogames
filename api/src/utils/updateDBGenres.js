const axios = require("axios");
const { Genre } = require("../DB_connection");

const URL = "https://api.rawg.io/api";
const { APIKEY } = process.env;

//Al levantar el server buscar en la API la lista de generos y actualizar la guardada en la DB
const updateDBGenres = async () => {
  try {
    const { data } = await axios(`${URL}/genres?key=${APIKEY}`);
    if (data) {
      let updated = 0;
      for (const result of data.results) {
        const [genre, created] = await Genre.findOrCreate({
          where: { id: result.id },
          defaults: { name: result.name },
        });
        if (created) updated++;
      }
      updated === 0
        ? console.log("No new genres added")
        : console.log(`${updated} new genres added`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateDBGenres;
