import express from "express";
const router = express.Router();
import User from '../controllers/user_controller';
import authMiddleware from '../common/auth_middleware';

/**
* @swagger
* tags:
*   name: User
*   description: The user API
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*       example:
*         email: 'ortal@gmail.com'
*         password: '123456'
*/

/**
* @swagger
* /user/:
*   get:
*     summary: get all users
*     tags: [User]
*     responses:
*       200:
*         description: all the users
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.get("/", authMiddleware, User.getAllUsers);


router.get("/:id", authMiddleware, User.getUserById);
router.get("/get_by_name/:name", authMiddleware, User.getUserByName);
router.patch("/:id", authMiddleware, User.putUserById);
router.delete("/:id", authMiddleware, User.deleteUserById);


export default router;