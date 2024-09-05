const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const editUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await prisma.user.update({
            where: {id: parseInt(id)},
            data: req.body,
        })

        res.status(200).json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

const deleteUser = async(req, res) => {
    const {id} = req.params;

    try {
        const animal = await prisma.user.delete({
            where: {id: parseInt(id)}
        })

        res.status(200).send("Utilisateur supprimé avec succès")
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

module.exports={
    editUser,
    deleteUser
}