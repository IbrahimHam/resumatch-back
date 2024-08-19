const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

module.exports = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        const fileData = fs.readFileSync(filePath);
        const data = await pdfParse(fileData);
        const lines = data.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        req.resumeText = lines;
        fs.unlinkSync(filePath);

        next();
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send('Error processing PDF');
    }
};
