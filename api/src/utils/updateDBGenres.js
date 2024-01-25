const axios = require("axios");
const { Genre } = require("../DB_connection");

const URL = "https://api.rawg.io/api/genres";
const { APIKEY } = process.env;

//Al levantar el server buscar en la API la lista de generos y actualizar la guardada en la DB
const updateDBGenres = async () => {
  try {
    const { data } = await axios(`${URL}?key=${APIKEY}`);
    if (data) {
      let updated = 0;
      for (const result of data.results) {
        const [genre, created] = await Genre.findOrCreate({
          where: { id: result.id },
          defaults: { name: result.name },
        });
        if (created) updated++;
      }
      return updated === 0
        ? console.log("No se añadió ningún género nuevo")
        : console.log(`Se añadieron ${updated} géneros nuevos`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateDBGenres;
