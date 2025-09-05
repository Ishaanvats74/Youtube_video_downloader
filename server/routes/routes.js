import express from "express";
import { Start, StartDownload } from "../controllers/controlls.js";

const router = express.Router();
router.post("/start",Start);
router.post("/startDownload",StartDownload);

export default router;