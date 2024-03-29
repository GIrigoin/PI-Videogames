const { Videogame } = require("../src/DB_connection");
const server = require("../src/app");
const session = require("supertest");
const agent = session(server);

beforeAll(async () => {
  return await Videogame.destroy({ where: {} });
});

describe("Routes Tests", () => {
  // afterAll(()=>{})
  let idDb;
  const newGame = {
    name: "Perro Loco 7",
    background_image:
      "https://media.rawg.io/media/games/20a/da45239fe22d035c0ebe64.jpg",
    genres: [2, 3, 5],
    description: "Perro Loco debe vengar la muerte de su mejor amigo",
    platforms: ["Mega Drive", "NES", "Atari 2600"],
    released: "2007-03-12",
    rating: 5,
  };

  const newGameUpdate = {
    name: "Perro Loco 7",
    background_image: "https://media.rawg.io/media/games/20a/updatedimage.jpg",
    genres: [1, 4, 6],
    description: "Perro Loco debe vengar la muerte de su mejor amigo. AGAIN ",
    platforms: ["Mega Drive", "NES"],
    released: "2017-03-12",
    rating: 4,
  };

  const newGameBadUpdate = {
    name: "Cualquier cosa asdasd",
    background_image:
      "https://media.rawg.io/media/games/20a/da45239fe22d035c0ebe64.jpg",
    genres: [2, 3, 5],
    description: "Perro Loco debe vengar la muerte de su mejor amigo",
    platforms: ["Mega Drive", "NES", "Atari 2600"],
    released: "2007-03-12",
    rating: 5,
  };

  const badGame = {
    // name: "Perro Loco 7",
    background_image:
      "https://media.rawg.io/media/games/20a/da45239fe22d035c0ebe64.jpg",
    genres: [2, 3, 5],
    description: "Perro Loco debe vengar la muerte de su mejor amigo",
    platforms: ["Mega Drive", "NES", "Atari 2600"],
    released: "2007-03-12",
    rating: 5,
  };
  const getId = async () => {
    try {
      const response = await agent.get(`/videogames?name=${newGame.name}`);
      if (response.body.length > 0) return response.body[0].id;
    } catch (error) {}
  };

  describe("POST /videogames", () => {
    it("Adds correctly the game to the DB", async () => {
      const response = await agent.post("/videogames").send(newGame);
      expect(response.status).toBe(201);
      expect(response.text).toBe("Game successfully added");
    });

    it("If any of the required fields is missing the Api responds with status 400 and a message", async () => {
      const response = await agent.post("/videogames").send(badGame);
      expect(response.status).toBe(400);
      expect(response.text).toBe("Missing datafields");
    });

    it("If a game of the same name is in the DB the Api responds with status 400 and a message", async () => {
      const response = await agent.post("/videogames").send(newGame);
      expect(response.status).toBe(400);
      expect(response.text).toBe("The game is already stored");
    });
  });

  describe("PUT /videogames", () => {
    it("Updates correctly the info", async () => {
      const response = await agent.put("/videogames").send(newGameUpdate);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Game's info updated");
    });

    it("If the name is missing the Api responds with status 400 and a message", async () => {
      const response = await agent.put("/videogames").send(badGame);
      expect(response.status).toBe(400);
      expect(response.text).toBe("Game's name is required");
    });

    it("If there is no match for the name in the Db, the Api responds with status 404 and a message", async () => {
      const response = await agent.put("/videogames").send(newGameBadUpdate);
      expect(response.status).toBe(404);
      expect(response.text).toBe("Game not found");
    });
  });

  describe("GET /videogames", () => {
    it("Response status is 200 and the API delivers an array of videogames with the right info", async () => {
      const response = await agent.get("/videogames");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      response.body.forEach((element) => {
        // background_image is not obligatory, so it's not tested
        expect(element).toHaveProperty(
          "id" && "name" && "rating" && "userCreated" && "genres"
        );
      });
    });
  });

  describe("GET /videogames?name=...", () => {
    it("Response status is 200 and the API delivers an array of a maximum of 15 videogames with the right info", async () => {
      const response = await agent.get("/videogames?name=car");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeLessThanOrEqual(15);
      response.body.forEach((element) => {
        // background_image is not obligatory, so it's not tested
        expect(element).toHaveProperty(
          "id" && "name" && "rating" && "userCreated" && "genres"
        );
      });
    });

    it("If there is no results sends a response with status 404 and a message", async () => {
      const response = await agent.get("/videogames?name=ertkdfgnmmn");
      // console.log(response);
      expect(response.status).toBe(404);
      expect(response.error.text).toBe("Can't find any game");
    });
  });

  describe("GET /videogames/:idVideogame", () => {
    // id sirve tambien para DELETE
    it("Works properly with database Id's", async () => {
      idDb = await getId();
      const response = await agent.get(`/videogames/${idDb}`);
      expect(response.status).toBe(200);
      //las propiedades obligatorias
      expect(response.body).toHaveProperty(
        "id" && "name" && "rating" && "userCreated" && "genres"
      );
    });

    it("Works properly with rawg api Id's", async () => {
      const response = await agent.get(`/videogames/25`);
      expect(response.status).toBe(200);
      //las propiedades obligatorias
      expect(response.body).toHaveProperty(
        "id" && "name" && "rating" && "userCreated" && "genres"
      );
    });

    it("If the id is not valid or there is no search results the Api responds with status 404 and a message", async () => {
      const response = await agent.get(
        `/videogames/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`
      );
      expect(response.status).toBe(404);
      expect(response.error.text).toBe("There is no game with the received Id");
    });
  });

  describe("DELETE /videogames/:idVideogame", () => {
    it("Deletes succefully game from DB", async () => {
      const response = await agent.delete(`/videogames/${idDb}`);
      expect(response.status).toBe(200);
      expect(response.text).toBe("Game successfully deleted");
    });

    it("If the Db has no game with the id or the id is wrong, the Api responds with status 400 and a message", async () => {
      const response = await agent.delete(
        `/videogames/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`
      );
      expect(response.status).toBe(404);
      expect(response.text).toBe("Invalid Id");
    });
  });

  describe("GET /genres", () => {
    it("Response status is 200 and the API delivers an array of genres with the right info", async () => {
      const response = await agent.get("/genres");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      response.body.forEach((element) => {
        expect(element).toHaveProperty("id" && "name");
      });
    });
  });
});
