const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log("register attempt begun");
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email }).exec();
        if (user){  // Tjek om bruger allerede eksisterer
            errors.push("User already registered")
            res.status(500).send("Email already exists")
        } else{
            const newUser = new User({
                email: email,
                password: password,
            });
            //FIXME: password skal krypteres. Ikke forsvarligt design. Rettes hvis der er tid

            let result = await newUser.save();  //Gem ny bruger i DB
            console.log(result);
            res.send(result)
        }

    } catch (e) {
        res.status(500).send(e);
    }

}

// const login = async () => {

// }

module.exports = { register }