import { Router } from "express";
const router = Router();

/* -------------------------------------------------------------------------- */
/*                                    ITEMS                                   */
/* -------------------------------------------------------------------------- */
import ItemsController from "../controllers/ItemsController";
router.get("/items", ItemsController.index);

/* -------------------------------------------------------------------------- */
/*                                   POINTS                                   */
/* -------------------------------------------------------------------------- */
import PointsController from "../controllers/PointsController";
router.get("/points", PointsController.index);
router.get("/points/:id", PointsController.show);
router.post("/points", PointsController.create);

export default router;
