const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    employeeId: { type: String, required: true },
    originalName: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    url: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attachment', attachmentSchema);
