const Postit = require("../models/postit");
const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');

const createPost = async (req, res) => {
    console.log("createPost triggered");
    try {
        let decoded = jwt.verify(req.get("jwt"), "HelloIBM");
        let token = JSON.parse(decoded.data);

        const { type, data } = req.body;
        const newPost = new Postit({
            data: data,
            type: type,
            owner: token.email
        });
        let result = await newPost.save();
        res.send(result);

    }
    catch (e) {
        res.status(500).send(e);
    }
}

const deletePost = async (req, res) => {
    console.log("deleting post");
    console.log(req.params)
    try{

        let decoded = jwt.verify(req.get("jwt"), "HelloIBM");
        let token = JSON.parse(decoded.data);
        let id = Mongoose.Types.ObjectId(req.params.id)
        
        
        let result = await Postit.deleteOne({_id: id}).exec();
        
        res.send(result);
    }
    catch(e){
        console.log(e)
        res.send(e)
    }


}

const getAllPosts = async (req, res) => {
    try {
        let decoded = jwt.verify(req.get("jwt"), "HelloIBM");

        let token = JSON.parse(decoded.data);
        console.log(token);
        let posts = await Postit.find({}).exec();

        res.send(posts);

    }
    catch (e) {
        res.status(500).send(e);

    }
}

module.exports = { createPost, deletePost, getAllPosts }