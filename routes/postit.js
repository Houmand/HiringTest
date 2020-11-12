var express = require('express');
var router = express.Router();

const postit = require('../controllers/postit');
router.post('/',postit.createPost)
router.delete('/:id',postit.deletePost)
router.get('/',postit.getAllPosts)

module.exports = router