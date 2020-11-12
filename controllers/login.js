const User = require('../models/user');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email }).exec();
        if (user) {  // Tjek om bruger allerede eksisterer
            errors.push("User already registered")
            res.status(500).send("Email already exists")
        } else {
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

const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email, password: password }).exec();
    if (user) {
        let token = jwt.sign({ data: JSON.stringify(user) }, "HelloIBM")   // secret bør opbevares andetsteds i sikkerhed. Måske en config-fil.
        res.send({token});
    } else {
        console.log("login failed")
        res.status(404).send()
    }
}

module.exports = { register, login }