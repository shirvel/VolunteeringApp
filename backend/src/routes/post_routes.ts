import express from "express";
const router = express.Router();
import PostController from "../controllers/post_controller";

router.get("/", PostController.getAllPosts)
router.post("/", PostController.createPost);
router.post("/:id/like", PostController.addLike);
router.post("/:id/dislike", PostController.addDislike);
router.patch("/:id", PostController.updatePostByID);
router.delete("/:id", PostController.deletePostById);


//router.get('/category/:category', PostController.findPostsByCategory);

export default router;
