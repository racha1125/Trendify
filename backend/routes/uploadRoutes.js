const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config();

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading a single image
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Function to handle stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                // Convert to Buffer if necessary
                const buffer = Buffer.isBuffer(fileBuffer)
                    ? fileBuffer
                    : Buffer.from(fileBuffer);

                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        // Call the stream upload function
        const result = await streamUpload(file.buffer);

        // Respond with the uploaded file's URL
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
