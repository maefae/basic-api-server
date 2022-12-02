"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./error-handlers/404.js");
const errorHandler = require("./error-handlers/500");
const logger = require("./middleware/logger.js");
const foodRouter = require("./routes/food.js");
const clothesRouter = require("./routes/clothes.js");
const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());
app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);

app.use("*", notFound);
app.use(errorHandler);

app.get("/", logger, (req, res, next) => {
  res.status(200).send("Connection to API Successful");
});

const start = () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

// app.get('/food', async (req, res, next) => {
//     //const users = await User.findAll();
//     const food = await FoodModel.findAll();
//     res.status(200).send(customers);
// } catch(e){
//     next(e);
// });

// app.post('/food', async (req, res, next) => {
//     try {
//         const newFood = await FoodModel.create(req.body)
//         res.status(200).send(newFood);
//     } catch(e) {
//         next(e)
//     }
// })

module.exports = {
  app,
  start,
};
