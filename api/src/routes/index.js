const express = require("express");
const getGenres = require("../controllers/getGenres");
const postVideogame = require("../controllers/postVideogame");
const getVideogameById = require("../controllers/getVideogameById");
const getVideogames = require("../controllers/getVideogames");
const getPlatforms = require("../controllers/getPlatforms");

const router = express.Router();

router.get("/videogames", getVideogames);
router.get("/videogames/:idVideogame", getVideogameById);
router.post("/videogames", postVideogame);
router.get("/genres", getGenres);
router.get("/platforms", getPlatforms);

module.exports = router;
