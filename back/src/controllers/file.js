const admin = require('firebase-admin');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

const uploadFiles = async (req, res) => {
    const files = req.files;
    const {userId} = req.body

    try {
        for (const file of files) {
            const fileName = `${userId}/${Date.now()}-${file.originalname}`;

            const fileBucket = bucket.file(fileName);
            await fileBucket.save(file.buffer);

            const publicUrl = await fileBucket.getSignedUrl({action: 'read', expires: '03-17-2025'});

            await prisma.file.create({
                data: {
                    name: file.originalname,
                    url: publicUrl.toString(),
                    userId: parseInt(userId)
                }
            })
        }

        res.status(200).json({
            message: 'Fichier(s) téléchargé(s) avec succès'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors du téléchargement'});
    }
};

const deleteFiles = async (req, res) => {
    const {filesData, userId} = req.body;
    try {
        for (const fileData of filesData) {
            const file = bucket.file(`${userId}/${fileData.name}`);
            await file.delete();

            await prisma.file.delete({
                where: {
                    id: parseInt(fileData.id)
                }
            })

            res.status(200).json({
                message: 'Fichier(s) téléchargé(s) avec succès'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la suppression'});
    }
}

module.exports = {
    uploadFiles,
    deleteFiles
};