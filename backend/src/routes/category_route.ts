import express from "express";
const router = express.Router();
import CategoryController from "../controllers/category_controllet";

// Create a new category
router.post('/categories', CategoryController.createCategory);

// Get all categories
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:name', CategoryController.getCategoryByName);