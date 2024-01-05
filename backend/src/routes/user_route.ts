import express from "express";
const router = express.Router();
import User from '../controllers/user_controller';

router.get("/user", User.getAllUsers);

router.get("/user/:id", User.getUserById);

router.post("/user", User.postUser);

router.put("/user/:id", User.putUserById);

router.delete("/user/:id", User.deleteUserById);

export default router;