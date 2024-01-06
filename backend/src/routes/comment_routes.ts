import express from "express";
const router = express.Router();
import CommentController from '../controllers/comment_controller';

router.get("/", CommentController.getAllComments);
router.post("/", CommentController.addComment);
router.delete("/:id", CommentController.deleteComment);
router.patch("/:id", CommentController.editComment);
 

export default router;