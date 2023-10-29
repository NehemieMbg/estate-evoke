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
exports.logUserOut = exports.logUserIn = exports.createUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const encryptedData_1 = require("../utils/encryptedData");
const http_status_codes_1 = require("http-status-codes");
const encryptedData_2 = require("../utils/encryptedData");
// ? CREATE USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, username, password } = req.body;
    try {
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                name,
                username,
                password: yield (0, encryptedData_1.hashPassword)(password),
            },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                avatar: true,
                bio: true,
                link: true,
            },
        });
        //? Log the user automatically after creating the account
        const token = (0, encryptedData_1.createToken)(user.id);
        res
            .cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'User created', data: user });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.createUser = createUser;
//? LOG USER IN
const logUserIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    try {
        let user;
        if (email) {
            user = yield prisma_1.default.user.findUnique({ where: { email } });
        }
        else if (username) {
            user = yield prisma_1.default.user.findUnique({ where: { username } });
        }
        if (!user)
            throw new Error('Wrong email/username or password');
        const isPasswordValid = yield (0, encryptedData_2.comparePassword)(password, user.password);
        if (!isPasswordValid)
            throw new Error('Wrong email/username or password');
        const token = (0, encryptedData_1.createToken)(user.id);
        // ? Remove password from user object
        user = {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            link: user.link,
        };
        res
            .cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'User logged in', data: user });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
        else
            res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: 'Something went wrong' });
    }
});
exports.logUserIn = logUserIn;
const logUserOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .clearCookie('jwt')
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: 'User logged out successfully' });
});
exports.logUserOut = logUserOut;
