import express from "express";
const router = express.Router();
import ChatController from '../controllers/chat_controller';
/**
* @swagger
* tags:
*   name: Chat
*   description: The chat API
*/

/**
* @swagger
* components:
*   schemas:
*     ChatRoom:
*       type: object
*       properties:
*         category_name:
*           type: string
*           description: The category name of the room
*         messages:
*           type: object
*           description: the messages the users send.
*       example:
*         category_name: 'cooking'
*         messages: [{content: 'hello', user_id: '12345678'}]
*/

/**
* @swagger
* /chat/:
*   get:
*     summary: get all messages in chat room
*     tags: [Chat]
*     responses:
*       200:
*         description: all the messages of the chat room
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ChatRoom'
*/
router.get("/:category", ChatController.get_old_messages);

export default router;