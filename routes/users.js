const router = require('express').Router();
const { getUser, getUsers } = require('../controllers/getUsers.js');

router.get('/users', getUsers);
router.get('/users/:id', getUser);

module.exports = router;
