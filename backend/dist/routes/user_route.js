"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/user", (req, res) => {
    res.send("get user");
});
router.get("/user/:id", (req, res) => {
    res.send("get user by id: " + req.params.id);
});
router.post("/user", (req, res) => {
    res.send("post user");
});
exports.default = router;
//# sourceMappingURL=user_route.js.map