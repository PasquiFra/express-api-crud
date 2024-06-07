const express = require("express");
const router = express.Router();
const {
    store,
    index
} = require('../controllers/categories.js');

console.log("entrato rotte /categories")

router.post('/', store);

router.get('/', index);

module.exports = router;