var express = require('express');
var router = express.Router();

const postit = require('../controllers/postit');
router.post('/createPost',postit.createPost)
router.post('/deletePost',postit.deletePost)
router.post('/getAllPosts',postit.getAllPosts)

module.exports = router