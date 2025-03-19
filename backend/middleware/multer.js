const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Using Node's built-in crypto module

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The folder to save uploaded files
    },
    filename: (req, file, cb) => {
        // Generate a unique string using timestamp and random bytes
        const uniqueString = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
        req.fileIdentifier = uniqueString; // Attach to req for later use in controllers
        const extension = path.extname(file.originalname); // Get file extension
        cb(null, uniqueString + extension); // Save file with unique name
    }
});

// File filter (for restricting file types)
const fileFilter = (req, file, cb) => {
    // Extended mimetype list to handle various ZIP formats
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
        'application/zip',
        'application/x-zip',
        'application/x-zip-compressed',
        'application/octet-stream'  // Some systems use this for ZIP files
    ];

    // Check if it's a ZIP file based on extension as a fallback
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.zip' || allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Allowed types are: image, pdf, zip'), false); // Reject the file
    }
};

// Initialize multer with the storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Optional: Limit file size (10MB)
});

module.exports = upload;