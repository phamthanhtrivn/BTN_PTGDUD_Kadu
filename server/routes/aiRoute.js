
import express from "express";
import { aiAssistantController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", aiAssistantController);

export default router;
