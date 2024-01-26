const PORT = 3001;
const server = require("./app");
const { conn } = require("./DB_connection");
const updateDBGenresAndPlatforms = require("./utils/updateDBGenresAndPlatforms");

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, async () => {
    await updateDBGenresAndPlatforms();
    console.log("Server raised in port: " + PORT);
  });
});
