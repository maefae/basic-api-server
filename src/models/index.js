"use strict";

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const clothesSchema = require("./clothes.schema.js");
const foodSchema = require("./food.schema.js");

// 'postgres://localhost:5432/api-server'
// 'postgres://username:password@localhost:5432/api-app'  <-- if you have a username and password
// will use ternary operator to setup sqlite for testing
const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory" : process.env.DATABASE_URL;

console.log(DATABASE_URL);

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// create a customer model with our schema. In this case, it'll be for the clothes and food schema.
const ClothesModel = clothesSchema(sequelizeDatabase, DataTypes);
const FoodModel = foodSchema(sequelizeDatabase, DataTypes);

//export the reference to sequelizedDB. the database itself is created within postgres. the sequelizedDatabase is the connection for my ORm to my database. connects from service to database.
module.exporta = {
  sequelizeDatabase,
  ClothesModel,
  FoodModel,
};
