import express from "express";
const router = express.Router();
import auth from '../controllers/auth_controller';

router.get("/register", auth.register);

router.get("/login", auth.login);

router.post("/logout", auth.logout);

export default router;