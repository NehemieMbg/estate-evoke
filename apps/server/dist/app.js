"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const path_1 = __importDefault(require("path"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const followRouter_1 = __importDefault(require("./routes/followRouter"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// allow access to public folder to get images
app.use(express_1.default.static(path_1.default.resolve(__dirname, './public')));
app.use('/api/v1/auth', authRouter_1.default);
app.use('/api/v1/users', userRouter_1.default);
app.use('/api/v1/posts', postRouter_1.default);
app.use('/api/v1/follows', authMiddleware_1.authMiddleware, followRouter_1.default);
app.use((err, req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
});
exports.default = app;
