import express from "express";
import * as studentController from "../controllers/studentController.js";
import * as fileUploadController from "../controllers/fileUploadController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// router init
const router = express.Router();

// student route
router.post("/registration", studentController.studentCreate);
router.post("/login", studentController.studentLogin);
router.get(
  "/readStudent",
  authMiddleware,
  studentController.studentProfileRead
);
router.post(
  "/studentUpdate",
  authMiddleware,
  studentController.studentProfileUpdate
);
router.get("/logout", studentController.studentLogout);

// file routes
router.post("/upload", fileUploadController.uploadFile);
router.get("/readFile/:file", fileUploadController.readFile);
router.get("/deleteFile/:file", fileUploadController.deleteFile);

//export
export default router;
