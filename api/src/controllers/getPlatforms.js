const { Platform } = require("../DB_connection");

const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.findAll({ attributes: ["id", "name"] });
    if (!platforms)
      return res.status(404).send("No se encontró ningúna plataforma");
    return res.json(platforms);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getPlatforms;
