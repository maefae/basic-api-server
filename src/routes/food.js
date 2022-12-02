"use strict";

const express = require("express");
const { FoodModel } = require("../models/index.js");

const router = express.Router();

const getFood = async (req, res, next) => {
  try {
    let allFood = await FoodModel.findAll();
    res.status(200).send(allFood);
  } catch (err) {
    next(err);
  }
};

const getOneFood = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let oneFood = await FoodModel.findOne({ where: { id: id } });
    res.status(200).send(oneFood);
  } catch (err) {
    next(err);
  }
};

const createFood = async (req, res, next) => {
  try {
    let foodObject = req.body;
    let newFood = await FoodModel.create(foodObject);
    res.status(201).send(newFood);
  } catch (err) {
    next(err);
  }
};

const updateFood = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let foodObject = req.body;
    let updatedFood = await FoodModel.update(foodObject, { where: { id: id } });
    res.status(200).send(updatedFood);
  } catch (err) {
    next(err);
  }
};

const deleteFood = async (req, res, next) => {
  try {
    let id = parseInt(req.params.id);
    let deletedFood = await FoodModel.destroy({ where: { id: id } });
    res.status(200).send(`Food item ${deletedFood} was deleted`);
  } catch (err) {
    next(err);
  }
};

router.get("/food", getFood);
router.get("/food/:id", getOneFood);
router.post("/food", createFood);
router.put("/food/:id", updateFood);
router.delete("/food/:id", deleteFood);

module.exports = router;
