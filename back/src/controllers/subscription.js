const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const createSubscription = async (req, res) => {
    const {userId} = req.body;
    try {
        const subscription = await prisma.subscription.create({
            data: {
                userId: userId,
            }
        })

        res.status(200).json(subscription)
    } catch (e) {
        console.error(e);
        res.status(500).json(e)
    }
}

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await prisma.subscription.findMany()
        subscriptions.length ?
            res.status(200).json(subscriptions) : res.status(404).json({message: 'Aucun abonnement trouvé'})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

const getUserSubscriptions = async (req, res) => {
    const {userId} = req.params;
    try {
        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId: parseInt(userId)
            }
        })
        subscriptions.length ?
            res.status(200).json(subscriptions) : res.status(404).json({message: 'Aucun abonnement trouvé'})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

module.exports = {
    createSubscription,
    getAllSubscriptions,
    getUserSubscriptions
}