import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define __dirname in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// upload single file middleware
const upload = multer({ storage }).single("myFile");

//  upload single file
export const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    } else {
      return res.status(200).json({
        message: "successfully upload file",
        file: req.file.filename,
      });
    }
  });
};

// readfile
export const readFile = (req, res) => {
  const { file } = req.params;
  const filePath = path.join(__dirname, "../../uploads", file);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "File not found",
        error: err.message,
      });
    } else {
      return res.status(200).json({ message: "File read successfully", data });
    }
  });
};

// delete file
export const deleteFile = (req, res) => {
  const { file } = req.params;
  const filePath = path.join(__dirname, "../../uploads", file);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(400).json({
        message: "File not found or error deleting file",
        error: err.message,
      });
    } else {
      return res
        .status(200)
        .json({ message: `File '${file}' deleted successfully` });
    }
  });
};
