const axios = require("axios");
const { Genre, Platform } = require("../DB_connection");

const URL = "https://api.rawg.io/api";
// https://api.rawg.io/api/platforms?key=03e307b037e54c788988609897ecb2c0
const { APIKEY } = process.env;

//Al levantar el server buscar en la API la lista de generos y actualizar la guardada en la DB
const updateDBGenresAndPlatforms = async () => {
  try {
    //Genres
    {
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
          ? console.log("No se añadió ningún género nuevo")
          : console.log(`Se añadieron ${updated} géneros nuevos`);
      }
    }

    //Platforms
    {
      const { data } = await axios(`${URL}/platforms?key=${APIKEY}`);
      if (data) {
        let updated = 0;
        for (const result of data.results) {
          const [platform, created] = await Platform.findOrCreate({
            where: { id: result.id },
            defaults: { name: result.name },
          });
          if (created) updated++;
        }
        updated === 0
          ? console.log("No se añadió ningúna plataforma nueva")
          : console.log(`Se añadieron ${updated} plataformas nuevas`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = updateDBGenresAndPlatforms;
