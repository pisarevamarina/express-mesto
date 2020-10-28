const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
const users = await User.find({})
res.status(200).send(users)
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: `Что-то пошло не так: ${err}` })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
     return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.send(user);
  } catch (err) {

    res.status(500).send({ message: 'Что-то пошло не так' })
  }}

  const createUser = async (req, res) => {
    try {
      const id = User.countDocuments();
      const { name, about, avatar } = req.body;
      const user = await User.create({ name, about, avatar, id})
      res.status(200).send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: 'Произошла ошибка' })
    }
  }

module.exports = {
  getUser,
  getUsers,
  createUser,
};
