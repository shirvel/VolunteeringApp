import express from "express";
const router = express.Router();
import Auth from '../controllers/auth_controller';
/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
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
* /auth/register:
*   post:
*     summary: registers a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.post("/register", Auth.register);
router.post("/google", Auth.googleSignin);

/**
* @swagger
* components:
*   schemas:
*     Tokens:
*       type: object
*       required:
*         - accessToken
*         - refreshToken
*       properties:
*         accessToken:
*           type: string
*           description: The JWT access token
*         refreshToken:
*           type: string
*           description: The JWT refresh token
*       example:
*         accessToken: '123cd123x1xx1'
*         refreshToken: '134r2134cr1x3c'
*/

/**
* @swagger
* /auth/login:
*   post:
*     summary: logins a new user
*     tags: [Auth]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: The acess & refresh tokens
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tokens'
*/

router.post("/login", Auth.login);

/**
* @swagger
* /auth/logout:
*   post:
*     summary: logout a user
*     tags: [Auth]
*     description: Need to provide the refresh token in the auth header
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: logout completed successfully
*/
router.post("/logout", Auth.logout);

/**
* @swagger
* /auth/refresh:
*   get:
*      summary: get a new access token using the refresh token
*      tags: [Auth]
*      description: need to provide the refresh token in the auth header
*      security:
*          - bearerAuth: []
*      responses:
*        200:
*           description: The access & refresh tokens
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/Tokens'
*/

router.get("/refresh", Auth.refresh)

export default router;