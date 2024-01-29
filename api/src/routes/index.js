const express = require("express");
const getGenres = require("../controllers/getGenres");
const postVideogame = require("../controllers/postVideogame");
const getVideogameById = require("../controllers/getVideogameById");
const getVideogames = require("../controllers/getVideogames");
const getPlatforms = require("../controllers/getPlatforms");
const deleteVideogame = require("../controllers/deleteVideogame");
const updateVideogame = require("../controllers/updateVideogame");

const router = express.Router();

router.get("/videogames", getVideogames);
router.get("/videogames/:idVideogame", getVideogameById);
router.post("/videogames", postVideogame);
router.get("/genres", getGenres);
//Rutas extras
router.get("/platforms", getPlatforms);
router.delete("/videogames/:idVideogame", deleteVideogame);
router.put("/videogames", updateVideogame);

module.exports = router;
