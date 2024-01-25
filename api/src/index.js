const PORT = 3001;
const server = require("./app");
const { conn } = require("./DB_connection");
const updateDBGenres = require("./utils/updateDBGenres");

conn.sync({ alter: true }).then(() => {
  server.listen(PORT, async () => {
    await updateDBGenres();
    console.log("Server raised in port: " + PORT);
  });
});
