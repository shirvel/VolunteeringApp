"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user_model"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllUsers");
    try {
        let users;
        if (req.query.name) {
            users = yield user_model_1.default.find({ name: req.query.name });
        }
        else if (req.query.id) {
            users = yield user_model_1.default.find({ _id: req.query._id });
        }
        else {
            users = yield user_model_1.default.find();
        }
        res.send(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const getUserById = (req, res) => {
    res.send("get user by id: " + req.params.id);
};
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("postUser: " + req.body);
    const user = new user_model_1.default(req.body);
    try {
        yield user.save();
        res.send("OK");
    }
    catch (err) {
        console.log(err);
        res.send("fail: " + err.message);
    }
});
const putUserById = (req, res) => {
    res.send("put user by id: " + req.params.id);
};
const deleteUserById = (req, res) => {
    res.send("delete user by id: " + req.params.id);
};
exports.default = { getAllUsers, getUserById, postUser, putUserById, deleteUserById };
//# sourceMappingURL=user_controller.js.map