const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getStats = async (req, res) => {
    try {
        //Nombre total d'utilisateurs
        const totalUsers = await prisma.user.count();

        //Nombre total de fichiers
        const totalFiles = await prisma.file.count();

        //Nombre de fichiers uploadés aujourd'hui
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filesToday = await prisma.file.count({
            where: {
                createdAt: {
                    gte: today, // Fichiers créés aujourd'hui
                },
            },
        });

        //Répartition des fichiers par client (avec leurs noms)
        const filesByUser = await prisma.file.groupBy({
            by: ['userId'],
            _count: {
                id: true,
            },
        });

        // Récupérer les noms des utilisateurs associés
        const userIds = filesByUser.map(user => user.userId);
        const users = await prisma.user.findMany({
            where: {
                id: { in: userIds },
            },
            select: {
                id: true,
                firstName: true,
            },
        });

        // Mapper les IDs d'utilisateurs à leurs noms
        const filesByClientFormatted = filesByUser.map(user => {
            const matchingUser = users.find(u => u.id === user.userId);
            return {
                user: matchingUser ? matchingUser.firstName : `Utilisateur inconnu (${user.userId})`,
                files: user._count.id,
            };
        });

        // Répondre avec les statistiques
        res.json({
            totalUsers,
            totalFiles,
            filesToday,
            filesByClient: filesByClientFormatted,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors du calcul des statistiques.' });
    }
};

module.exports = {
    getStats,
};
