import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";
import authMiddleware from '../common/auth_middleware';

/**
* @swagger
* tags:
*   name: Post
*   description: The posts API
*/

/**
* @swagger
* components:
*   schemas:
*     Post:
*       type: object
*       properties:
*         user_id:
*           type: string
*           description: The related user id.
*         title:
*           type: string
*           description: the title of the post.
*         content:
*           type: string
*           description: the content of the the post.
*         phoneNumber:
*           type: string
*           description: the user's phone number.
*         image:
*           type: string
*           description: relates image to the the post.
*         category:
*           type: string
*           description: the category of the the post.
*         likes:
*           type: number
*           description: likes count of the the post.
*         likedBy:
*           type: number
*           description: list of users who liked the post.
*         dislikes:
*           type: number
*           description: the content of the the post.
*         dislikedBy:
*           type: string
*           description: list of users who liked the post.
*       example:
*         user_id: '123'
*         title: 'test'
*         content: 'test-content'
*         phoneNumber: '0123456' 
*         image: 'image.jpg'
*         category: 'test-category'
*         likes: '10'
*         likedBy: '[shelly,shir,ortal]'
*         dislikes: '0'
*         dislikedBy: []
*/

/**
* @swagger
* /posts/:
*   get:
*     summary: get all posts
*     tags: [Posts]
*     responses:
*       200:
*         description: all the posts
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.get("/", PostController.getAllPosts);
/**
* @swagger
* /posts/:
*   post:
*     summary: create a post
*     tags: [Post]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       201:
*         description: the new Post
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.post("/", authMiddleware, PostController.createPost);
/**
* @swagger
* /posts/{id}/likes:
*   patch:
*     summary: num likes of the post
*     tags: [Post]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       204:
*         description: num of likes
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.post("/:id/like", authMiddleware, PostController.like);
/**
* @swagger
* /posts/{id}/dislikes:
*   patch:
*     summary: num dislikes of the post
*     tags: [Post]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       204:
*         description: num of dislikes
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
//router.post("/:id/dislike", authMiddleware, PostController.addDislike);
/**
* @swagger
* /posts/{id}:
*   patch:
*     summary: Edit post
*     tags: [Post]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       204:
*         description: the updated post
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.patch("/:id", PostController.updatePostByID);
/**
* @swagger
* /posts/{id}:
*   delete:
*     summary: delete a post by id
*     tags: [Post]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       204:
*         description: success message
*/
router.delete("/:id", authMiddleware, PostController.deletePostById);

/**
* @swagger
* /get_by_user/{userId}:
*   get:
*     parameters:
*       - in: path
*         name: userId
*         required: true
*         type: string
*         description: The id of the user to get its posts
*     summary: get all userId posts
*     tags: [Comment]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       200:
*         description: the Posts
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/
router.get("/get_by_user/:userId", authMiddleware, PostController.getByUser);
export default router;
