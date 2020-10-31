const Card = require("../models/card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).send({ message: "Произошла ошибка" });
    } else {
      res.status(500).send({ message: `Что-то пошло не так: ${err}` });
    }
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ owner, name, link });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ message: "Произошла ошибка" });
    } else {
      res.status(500).send({ message: "Что-то пошло не так" });
    }
  }
};

const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.id);
    if (!card) {
      res.status(404).send({ message: "Нет карточки с таким id" });
    } else {
      res.status(200).send(card);
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).send({ message: "Невалидный id" });
    } else {
      res.status(500).send({ message: "Что-то пошло не так" });
    }
  }
};

const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      res.status(404).send({ message: "Нет карточки с таким id" });
    } else {
      res.status(200).send(card);
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).send({ message: "Невалидный id" });
    } else {
      res.status(500).send({ message: "Что-то пошло не так" });
    }
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, {
      $pull: { likes: req.user._id },
    });
    if (!card) {
      res.status(404).send({ message: "Нет карточки с таким id" });
    } else {
      res.status(200).send(card);
    }
  } catch (err) {
    if (err.name === "CastError") {
      res.status(400).send({ message: "Невалидный id" });
    } else {
      res.status(500).send({ message: "Что-то пошло не так" });
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};