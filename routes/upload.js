const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec, execSync, execFileSync } = require("child_process");

const router = express.Router();

// Upload directory
const uploadPath = path.join(__dirname, "../assets/uploads");

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: uploadPath,
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Function to delete the old file
function deleteOldFile() {
    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error("Error reading upload directory:", err);
            return;
        }
        if (files.length > 1) {
            const oldFile = path.join(uploadPath, files[0]); // Assuming only one file exists
            fs.unlink(oldFile, (err) => {
                // if (err) console.error("Failed to delete old file:", err);
                // else console.log("Old file deleted:", oldFile);
            });
        }
    });
}

// Function to implement File Upload Vulnerabilities
function executeFile(file) {
    const uploadedFilePath = path.join(uploadPath, file.filename);

    // console.log(uploadedFilePath);
    // console.log(file.mimetype);

    // Automatically execute JavaScript files
    if (file.mimetype === "text/javascript") {
        console.log("start exec");
        var output = execSync(`node "${uploadedFilePath}"`).toString().trim();
        console.log(output);
        return output;
    } else {
        return null;
    }
}

// File upload route
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    // Delete old file only if new upload is successful
    deleteOldFile();

    // Specific logic for File Upload Vulnerabilities
    var execRes = executeFile(req.file);

    res.json({
        message: execRes || "File uploaded successfully",
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
    });
});

module.exports = router;
