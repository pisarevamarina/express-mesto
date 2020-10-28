const Card = require('../models/card')

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({})
    res.status(200).send(cards)
  } catch (err) {
    res.status(500).send({ message: `Что-то пошло не так: ${err}` })
  }
}

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;
    const card = await Card.create({ owner, name, link });
    res.status(200).send(card);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Произошла ошибка' });
  }
}

const deleteCard = async (req, res) => {
  try {
const card = await Card.findByIdAndRemove(req.params.id)
if(!card) {
  return res.status(404).send({ message: 'Нет карточки с таким id' });
}
res.status(200).send(card)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Что-то пошло не так' })
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard
};
