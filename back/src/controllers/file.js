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

    let filesData = []

    try {
        for (const file of files) {
            const fileExtension = file.originalname.split(".").pop();

            const fileData = await prisma.file.create({
                data: {
                    name: file.originalname,
                    // url: publicUrl.toString(),
                    size: file.size,
                    format: fileExtension,
                    userId: parseInt(userId)
                }
            })

            const fileName = `${userId}/${fileData.id}-${file.originalname}`;

            const fileBucket = bucket.file(fileName);
            await fileBucket.save(file.buffer);

            const publicUrl = await fileBucket.getSignedUrl({action: 'read', expires: '03-17-2025'});

            const fileDataUpdate = await prisma.file.update({
                where: {
                    id: fileData.id
                },
                data: {
                    url: publicUrl.toString()
                }
            })

            filesData.push(fileDataUpdate);
        }

        res.status(200).json({
            message: 'Fichier(s) téléchargé(s) avec succès',
            files: filesData
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
            const file = bucket.file(`${userId}/${fileData.id}-${fileData.name}`);
            await file.delete();

            await prisma.file.delete({
                where: {
                    id: parseInt(fileData.id)
                }
            })
        }
        res.status(200).json({
            message: 'Fichier(s) supprimé(s) avec succès'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la suppression'});
    }
}

const getAllfiles = async (req, res) => {
    try {
        const files = await prisma.file.findMany()
        files.length ? res.status(200).json(files) : res.status(404).json({message: 'Aucun fichiers trouvés'})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

const getFilesByUser = async (req, res) => {
    const {id} = req.params;
    try {
        const files = await prisma.file.findMany({
            where: {
                userId: parseInt(id)
            }
        })
        files.length ? res.status(200).json(files) : res.status(404).json({message: 'Aucun fichiers trouvés'})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Erreur lors de la recuperation'});
    }
}

module.exports = {
    uploadFiles,
    deleteFiles,
    getAllfiles,
    getFilesByUser
};