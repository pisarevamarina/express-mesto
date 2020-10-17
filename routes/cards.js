const router = require('express').Router();
const { getCards } = require('../controllers/getCards.js')

router.get('/cards', getCards);

module.exports = router;
