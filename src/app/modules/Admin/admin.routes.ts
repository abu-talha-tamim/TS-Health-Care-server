import express, { NextFunction } from "express";
import { AdminController } from "./admin.controller";
import { adminValidationSchemas } from "./admin.validation";
import validateRequest from "../../../middleares/validateRequest";
const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB
);
router.delete("/:id", AdminController.deleteFromDB);
router.delete("/soft-delete/:id", AdminController.softDeleteFromDB);

export const adminRoutes = router;
