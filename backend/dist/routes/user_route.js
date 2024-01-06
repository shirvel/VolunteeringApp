"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
router.get("/user", user_controller_1.default.getAllUsers);
router.get("/user/:id", user_controller_1.default.getUserById);
router.post("/user", user_controller_1.default.postUser);
router.put("/user/:id", user_controller_1.default.putUserById);
router.delete("/user/:id", user_controller_1.default.deleteUserById);
exports.default = router;
//# sourceMappingURL=user_route.js.map