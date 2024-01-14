import express from "express";
const router = express.Router();
import CommentController from '../controllers/comment_controller';
import authMiddleware from '../common/auth_middleware';

router.get("/", authMiddleware, CommentController.getAllComments);
router.post("/", authMiddleware, CommentController.addComment);
router.delete("/:id", authMiddleware, CommentController.deleteComment);
router.patch("/:id", authMiddleware, CommentController.editComment);
 

export default router;