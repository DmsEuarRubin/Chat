const { Users } = require("../models");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const passwordHasher = require("../lib/passwordHasher");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: 'Fill in all the fields' })

      //  if (name.length > 3 || name.length < 30) return res.status(400).json({ message: 'Name must be more than 3 letters and less than 30' })

      //  if(email.length > 3 || email.length < 50) return res.status(400).json({ message: 'Email must be more than 3 letters and less than 50' })

       // if(password.length > 4 || name.length < 256) return res.status(400).json({ message: 'Password must be more than 4 letters and less than 256' })

        let user = await Users.findOne({ where: { email } })

        if (user) return res.status(400).json({ message: `User with this email already exists` })

        if (!validator.isEmail(email)) return res.status(400).json({ message: 'Enter the valid email address' })

        if (!validator.isStrongPassword(password)) return res.status(400).json({ message: 'Upgrading password to something more secure for better protection' })

        await Users.create({ name, email, password: await passwordHasher(password) }).then(data => {
            const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
            return res.status(201).json({ message: "User successfully created!", id: data.id, name, email, accessToken })
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error)
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'Fill in all the fields' })

        let user = await Users.findOne({ where: { email: email } })

        if (!user) return res.status(400).json({ message: "Invalid email or password" })

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json({ message: "Invalid email or password" })

        const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
        return res.status(200).json({ message: `You are successfully logging in!`, id: user.id, name: user.name, email, accessToken })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: `Server error: ${error.name}` })
    }
}

const findUser = async(req, res) => {
    try {
    const userId = req.params.userId
    const user = await Users.findByPk(userId);

    return res.status(200).json(user)
} catch (error) {
    console.log(error.message);
    return res.status(500).json(error)
}

}
module.exports = {
    createUser,
    loginUser,
    findUser
}