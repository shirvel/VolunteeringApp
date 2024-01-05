import express from "express";
const router = express.Router();
import User from '../controllers/user_controller';

router.get("/user", (req, res) => {
    res.send("get user");
});

router.get("/user/:id", (req, res) => {
    res.send("get user by id: " + req.params.id);
});

router.post("/user", (req, res) => {
    console.log(req.body);
    res.send("new user" + req.body.name);
});

router.put("/user/:id", (req, res) => {
    res.send("put user by id: " + req.params.id);
});

router.delete("/user/:id", (req, res) => {
    res.send("delete user by id: " + req.params.id);
});

export default router;