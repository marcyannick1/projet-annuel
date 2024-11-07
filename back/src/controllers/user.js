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
        const user = await prisma.user.delete({
            where: {id: parseInt(id)},
            include: {File: true}
        })

        res.status(200).json(user)
    } catch (e) {
        console.error(e)
        res.status(500).json(e)
    }
}

const getAdminUsers = async (req, res) => {
    try {
        const admins = await prisma.user.findMany({
            where: {
                isSuperAdmin: true
            }
        })
        admins.length ? res.status(200).json(admins) : res.status(404).json({message: 'Aucun utilisateurs trouvés'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

module.exports={
    editUser,
    deleteUser,
    getAdminUsers
}