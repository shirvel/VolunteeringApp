import express from "express";
const router = express.Router();
import User from '../controllers/user_controller';
import authMiddleware from '../common/auth_middleware';

router.get("/user", authMiddleware, User.getAllUsers);
router.get("/user/:id", authMiddleware, User.getUserById);
router.patch("/user/:id", authMiddleware, User.putUserById);
router.delete("/user/:id", authMiddleware, User.deleteUserById);

export default router;