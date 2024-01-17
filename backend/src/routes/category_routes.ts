import express from "express";
const router = express.Router();
import CategoryController from '../controllers/category_controller';
import authMiddleware from '../common/auth_middleware';


router.delete("/:id", authMiddleware, CategoryController.deleteCategory);
router.post("/categories", authMiddleware, CategoryController.addCategory);
router.get("/", authMiddleware, CategoryController.getAllCategories);
//router.post("/categories", authMiddleware, CategoryController.addCategory);

 

export default router;