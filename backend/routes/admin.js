import express from "express";
import * as admin from "../controllers/admin.js";
import { requireAdmin } from "../middleware/admin.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, requireAdmin);
router.get("/shows/:id/associations", admin.getShowAssociations);
router.get("/:entity", admin.listRecords);
router.post("/:entity", admin.createRecord);
router.put("/:entity", admin.updateRecord);
router.delete("/:entity", admin.deleteRecord);

export default router;
