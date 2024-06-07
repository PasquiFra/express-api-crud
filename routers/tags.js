const express = require("express");
const router = express.Router();
const {
    store,
    index
} = require("../controllers/tags.js");

console.log("entrato rotte /tags")

router.post('/', store);

router.get('/', index);

module.exports = router;