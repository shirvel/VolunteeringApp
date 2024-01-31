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
*         - name
*       properties:
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*         name:
*           type: string
*           description: The user name
*       example:
*         email: 'ortal@gmail.com'
*         password: '123456'
*         name: 'Ortal'
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

router.get("/", User.getAllUsers);



router.get("/:id", User.getUserById);
router.get("/get_by_name/:name", User.getUserByName);

/**
* @swagger
* /user/{id}:
*   patch:
*     parameters:
*       - in: path
*         name: id
*         required: true
*         type: string
*         description: The id of the user
*     summary: update a user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       204:
*         description: the updated user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.patch("/:id", User.putUserById);


/**
* @swagger
* /user/{id}:
*   delete:
*     parameters:
*       - in: path
*         name: id
*         required: true
*         type: string
*         description: The id of the user
*     summary: delete a user by id
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: success message
*/

router.delete("/:id", User.deleteUserById);


export default router;