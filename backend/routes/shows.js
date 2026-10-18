import express from "express";
import * as shows from "../controllers/shows.js"

const router = express.Router();

// /api/shows/id
router.get("/:id", shows.getShowById);

export default router;