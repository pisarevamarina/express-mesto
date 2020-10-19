const path = require('path');
const readFile = require('../utils/read-file');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(jsonDataPath)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: `Что-то пошло не так: ${err}` }));
};

const getUser = (req, res) => {
  const { id } = req.params;
  readFile(jsonDataPath)
    .then((data) => {
      const userToFind = data.find((user) => user._id === id);
      return userToFind;
    })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: 'Нет пользователя с таким id' });
      }
      return res.send(user);
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

module.exports = {
  getUser,
  getUsers,
};
