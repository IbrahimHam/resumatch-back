const multer = require('multer');
const path = require('path');

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'))  // Save files in the uploads directory
    },
    filename: (req, file, cb) => {
        // Naming convention for saved files
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// Filter to ensure only PDF files are processed
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
