const express = require("express");
const router = express.Router();

const {
    store,
    index,
    show,
    update,
    destroy
} = require('../controllers/posts');

// Rotte di /posts

console.log("entrato rotte /posts")

router.post('/', store);
router.get('/', index);
router.get('/:slug', show);
router.put('/:slug', update);
router.delete('/:slug', destroy)

module.exports = router;