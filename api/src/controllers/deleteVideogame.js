const { Videogame } = require("../DB_connection");

const deleteVideogame = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const deleted = await Videogame.destroy({ where: { id: idVideogame } });
    if (deleted === 0) return res.status(404).send("Id no valido");
    return res.send("Borrado exitoso");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = deleteVideogame;
