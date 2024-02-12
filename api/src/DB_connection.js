require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_NAME_TEST } = process.env;
const VideogameModel = require("./models/Videogame");
const GenreModel = require("./models/Genre");
const dbName = process.env.NODE_ENV === "test" ? DB_NAME_TEST : DB_NAME;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${dbName}`,
  { logging: false, native: false }
);

VideogameModel(sequelize);
GenreModel(sequelize);

const { Videogame, Genre } = sequelize.models;

Videogame.belongsToMany(Genre, { as: "genres", through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

module.exports = { conn: sequelize, Videogame, Genre };
