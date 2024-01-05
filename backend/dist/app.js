"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const user_route_1 = __importDefault(require("./routes/user_route"));
mongoose_1.default.connect(process.env.DATABASE_URL);
const db = mongoose_1.default.connection;
db.on('error', error => { console.error(error); });
db.once('open', () => console.log('Connected to mongo!'));
const app = (0, express_1.default)();
app.use(user_route_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send("First api");
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=app.js.map