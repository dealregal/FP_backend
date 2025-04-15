const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Function to delete all files in the uploads folder
const clearUploadsFolder = () => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads folder:", err);
      return;
    }
    for (const file of files) {
      fs.unlink(path.join(uploadDir, file), (err) => {
        if (err) console.error("Error deleting file:", file, err);
      });
    }
  });
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Clear existing files before saving a new one
    clearUploadsFolder();
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// File Upload Route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "File uploaded successfully", file: req.file.filename });
});

// File Download Route
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

module.exports = router;
