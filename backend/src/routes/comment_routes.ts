import express from "express";
const router = express.Router();
import CommentController from '../controllers/comment_controller';
import authMiddleware from '../common/auth_middleware';

/**
* @swagger
* tags:
*   name: Comment
*   description: The comments API
*/

/**
* @swagger
* components:
*   schemas:
*     Comment:
*       type: object
*       properties:
*         post_id:
*           type: string
*           description: The related post id.
*         user_name:
*           type: string
*           description: the user name who wrote the comment.
*         content:
*           type: string
*           description: the content of the comment.
*       example:
*         post_id: '123'
*         user_name: 'name'
*         content: 'hello'
*/

/**
* @swagger
* /comments/:
*   get:
*     summary: get all comments
*     tags: [Comment]
*     responses:
*       200:
*         description: all the comments
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.get("/", authMiddleware, CommentController.getAllComments);

/**
* @swagger
* /comments/:
*   post:
*     summary: add a comment
*     tags: [Comment]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       201:
*         description: the new comment
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.post("/", authMiddleware, CommentController.addComment);


/**
* @swagger
* /comments/{id}:
*   delete:
*     parameters:
*       - in: path
*         name: id
*         required: true
*         type: string
*         description: The id of the comment
*     summary: delete a comment by id
*     tags: [Comment]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       204:
*         description: success message
*/
router.delete("/:id", authMiddleware, CommentController.deleteComment);

/**
* @swagger
* /comments/{id}:
*   patch:
*     parameters:
*       - in: path
*         name: id
*         required: true
*         type: string
*         description: The id of the comment
*     summary: update a comment
*     tags: [Comment]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       204:
*         description: the updated comment
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.patch("/:id", authMiddleware, CommentController.editComment);


/**
* @swagger
* /get_by_post/{postId}:
*   get:
*     parameters:
*       - in: path
*         name: postId
*         required: true
*         type: string
*         description: The id of the post to get its comments
*     summary: get all postId comments
*     tags: [Comment]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Comment'
*     responses:
*       200:
*         description: the comments
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Comment'
*/
router.get("/get_by_post/:postId", authMiddleware, CommentController.getByPost);

export default router;