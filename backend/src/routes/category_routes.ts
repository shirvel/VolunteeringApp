import express from "express";
const router = express.Router();
import CategoryController from '../controllers/category_controller';
import authMiddleware from '../common/auth_middleware';
/**
* @swagger
* tags:
*   name: Category
*   description: The category API
*/

/**
* @swagger
* components:
*   schemas:
*     Category:
*       type: object
*       properties:
*         name:
*           type: string
*           description: category name.
*       example:
*         name: 'test-category'
*/
/**
* @swagger
* /categories/:
*   get:
*     summary: get all categories
*     tags: [Category]
*     responses:
*       200:
*         description: all the categories
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Category'
*/
router.get("/", authMiddleware, CategoryController.getAllCategories);

/**
* @swagger
* /categories/:
*   post:
*     summary: add a Category
*     tags: [Category]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Category'
*     responses:
*       201:
*         description: the new Category
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Category'
*/
router.post("/", CategoryController.addCategory);
/**
* @swagger
* /categories/{id}:
*   delete:
*     summary: delete a Category by id
*     tags: [Category]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Category'
*     responses:
*       204:
*         description: success message
*/
router.delete("/:id", CategoryController.deleteCategory);

export default router;