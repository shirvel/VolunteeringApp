import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";

router.get("/", PostController.getAllPosts)
router.get("/:postId", PostController.getPostByID)
router.post("/", PostController.createPost)
router.delete("/:postId", PostController.deletePostById);
router.put("/:postId", PostController.updatePostByID);
router.put("/posts/:postId/like", PostController.addLike);
router.put("/posts/:postId/like", PostController.addDiskLike);
router.get('/posts/category/:category', PostController.getPostsByCategory);

export default router;
