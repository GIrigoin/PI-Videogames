const { Videogame } = require("../DB_connection");

const deleteVideogame = async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const deleted = await Videogame.destroy({ where: { id: idVideogame } });
    if (deleted === 0) return res.status(404).send("Invalid Id");
    return res.send("Game successfully deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = deleteVideogame;
