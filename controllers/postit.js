const Postit = require("../models/postit");
const jwt = require('jsonwebtoken');

const createPost = async (req, res) => {
    try{
        let decoded = jwt.verify(req.get("jwt"), "HelloIBM");
        
        let token = JSON.parse(decoded.data);
        
        const {type, data} = req.body;
        const newPost = new Postit({
            type: type,
            data: data,
            owner: token.email
        });
        let result = await newPost.save();
        res.send(result);

    }
    catch(e){
        res.status(500).send(e);
    }
}

const deletePost = async (req, res) => {
    
}

const getAllPosts = async(req, res) => {

}

module.exports(createPost, deletePost, getAllPosts)