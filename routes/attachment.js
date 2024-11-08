const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinaryConfig');
const Attachment = require('../models/Attachment');

const router = express.Router();
const upload = multer({ storage });

// POST
router.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const employeeId = req.body._id;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadedFiles = req.files.map(file => ({
            employeeId,
            originalName: file.originalname,
            cloudinaryId: file.public_id || file.filename,
            url: file.path,
            fileType: file.mimetype,
            fileSize: file.size,
        }));

        const attachments = await Attachment.insertMany(uploadedFiles);
        res.status(200).json({ files: attachments });

    } catch (error) {
        console.error('File upload error:', error.message);
        res.status(500).json({ error: 'Error uploading files' });
    }
});

// GET
router.get('/attachments', async (req, res) => {
    try {
        const attachments = await Attachment.find();
        res.status(200).json({ attachments });
    } catch (error) {
        console.error('Error fetching attachments:', error.message);
        res.status(500).json({ error: 'Error fetching attachments' });
    }
});

module.exports = router;
