var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose');
const MongoInMemory = require('mongo-in-memory');
const login = require('./routes/login')

var mongoServerInstance = new MongoInMemory(); //OBS: default port 27017

mongoServerInstance.start((error, config) => {

    if (error) {
        console.error(error)
    } else {
        console.log("Host: " + config.host);
        console.log("Port: " + configt.port);
    }
})

mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose connected.")
}).catch((error) => {
    console.log(error)
})

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/whiteboard/src")));
app.use('/login', login)

var port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log("App running at http://localhost:"+port);
});