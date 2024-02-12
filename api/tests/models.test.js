const {
  sequelize,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} = require("sequelize-jest-helpers");

const GenreModel = require("../src/models/Genre");
const VideogameModel = require("../src/models/Videogame");

describe("Genre Model", () => {
  const TestGenre = GenreModel(sequelize);
  const genre = new TestGenre();

  describe("The model is created with the right name", () => {
    checkModelName(TestGenre)("Genre");
  });

  describe("It has the right properties", () => {
    ["id", "name"].forEach(checkPropertyExists(genre));
  });

  describe("The 'id' property", () => {
    it("It's INTEGER", () => {
      expect(genre.id.type.key).toBe("INTEGER");
    });
    it("It's the primary key", () => {
      expect(genre.id.primaryKey).toBeTruthy();
    });
    it("It's not NULL", () => {
      expect(genre.id.allowNull).toBeFalsy();
    });
  });

  describe("The 'name' property", () => {
    it("It's STRING", () => {
      expect(genre.name.type.key).toBe("STRING");
    });
    it("It's not NULL", () => {
      expect(genre.name.allowNull).toBeFalsy();
    });
  });
});

describe("Videogame Model", () => {
  const TestVideogame = VideogameModel(sequelize);
  const videogame = new TestVideogame();

  describe("The model is created with the right name", () => {
    checkModelName(TestVideogame)("Videogame");
  });

  describe("It has the right properties", () => {
    [
      "id",
      "name",
      "description",
      "platforms",
      "background_image",
      "released",
      "rating",
      "userCreated",
    ].forEach(checkPropertyExists(videogame));
  });

  describe('The "id" property', () => {
    it("It's UUID", () => {
      expect(videogame.id.type.key).toBe("UUID");
    });
    it("It's the primary key", () => {
      expect(videogame.id.primaryKey).toBeTruthy();
    });
    it("It's not NULL", () => {
      expect(videogame.id.allowNull).toBeFalsy();
    });
  });

  describe("The 'name' property", () => {
    it("It's STRING", () => {
      expect(videogame.name.type.key).toBe("STRING");
    });
    it("It's not NULL", () => {
      expect(videogame.name.allowNull).toBeFalsy();
    });
    it("It's a unique key", () => {
      expect(videogame.name.unique).toBeTruthy();
    });
  });

  describe('The "description" property', () => {
    it("It's STRING", () => {
      expect(videogame.description.type.key).toBe("STRING");
    });
    it("It's not NULL", () => {
      expect(videogame.description.allowNull).toBeFalsy();
    });
  });

  describe('The "background_image" property', () => {
    it("It's STRING", () => {
      expect(videogame.background_image.type.key).toBe("STRING");
    });
  });

  describe('The "released" property', () => {
    it("It's STRING", () => {
      expect(videogame.released.type.key).toBe("STRING");
    });
  });

  describe('The "rating" property', () => {
    it("It's FLOAT", () => {
      expect(videogame.rating.type.key).toBe("FLOAT");
    });
    it("It's not NULL", () => {
      expect(videogame.rating.allowNull).toBeFalsy();
    });
    it("Must be between 0 and 5", () => {
      expect(videogame.rating.validate.min).toBe(0);
      expect(videogame.rating.validate.max).toBe(5);
    });
  });

  describe('The "userCreated property', () => {
    it("It's BOOLEAN", () => {
      expect(videogame.userCreated.type.key).toBe("BOOLEAN");
    });
    it("It's not NULL", () => {
      expect(videogame.userCreated.allowNull).toBeFalsy();
    });
    it("Defaults to 'true'", () => {
      expect(videogame.userCreated.defaultValue).toBeTruthy();
    });
  });
});
