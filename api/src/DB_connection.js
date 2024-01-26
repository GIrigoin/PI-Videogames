require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const VideogameModel = require("./models/Videogame");
const GenreModel = require("./models/Genre");
const PlatformModel = require("./models/Platform");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
  { logging: false, native: false }
);

VideogameModel(sequelize);
GenreModel(sequelize);
PlatformModel(sequelize);

const { Videogame, Genre, Platform } = sequelize.models;

Videogame.belongsToMany(Genre, { as: "genres", through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

module.exports = { conn: sequelize, Videogame, Genre, Platform };
