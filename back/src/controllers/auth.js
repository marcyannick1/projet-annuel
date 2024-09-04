const {PrismaClient} = require('@prisma/client');
const {hashPassword, checkPassword} = require("../utils/bcrypt");
const {generateToken} = require("../utils/jwt");

const prisma = new PrismaClient();

const register = async(req, res) => {
    const { firstName, lastName, email, password, address, birthday } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashPassword(password),
                address,
                birthday
            }
        })
        res.status(201).json(user)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {email},
        })

        if (user && checkPassword(password, user.password)) {
            const token = await generateToken(user)
            res.status(200).json({token})
        } else {
            res.status(401).send({message: "Email ou mot de passe incorrect"});
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
}

module.exports={
    register,
    login
}