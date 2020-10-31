const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: `Что-то пошло не так: ${err}` });
    }
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id' });
    }
    res.status(500).send({ message: 'Что-то пошло не так' });
  }
};

const createUser = async (req, res) => {
  try {
    const id = await User.countDocuments();
    const { name, about, avatar } = req.body;
    const user = await User.create({
      id,
      name,
      about,
      avatar,
    });
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Что-то пошло не так' });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        about: req.body.about,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: 'Что-то пошло не ' });
    }
  }
};

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: req.body.avatar,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Произошла ошибка' });
    } else {
      res.status(500).send({ message: `Что-то пошло не так ${err}` });
    }
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};
