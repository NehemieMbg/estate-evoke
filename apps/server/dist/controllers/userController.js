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
exports.deleteUser = exports.updateUserPassword = exports.updateUserCredentials = exports.updateUser = exports.getCurrentUser = exports.getAllUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../utils/prisma"));
const encryptedData_1 = require("../utils/encryptedData");
// ? GET ALL USERS
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'All users', data: users });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.getAllUsers = getAllUsers;
// ? GET USER
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                name: true,
                username: true,
                location: true,
                avatar: true,
                bio: true,
                link: true,
                email: true,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'User found', data: user });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.getCurrentUser = getCurrentUser;
// ? UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: id },
            data: req.body,
        });
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'User updated', data: updatedUser });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.updateUser = updateUser;
//? UPDATE USER EMAIL
const updateUserCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { email, username } = req.body;
    try {
        yield prisma_1.default.user.update({
            where: { id: id },
            data: {
                email,
                username,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'User credentials updated' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.updateUserCredentials = updateUserCredentials;
// ? UPDATE USER PASSWORD
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { newPassword } = req.body;
    try {
        yield prisma_1.default.user.update({
            where: { id: id },
            data: {
                password: yield (0, encryptedData_1.hashPassword)(newPassword),
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'User password updated' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.updateUserPassword = updateUserPassword;
// ? DELETE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    try {
        yield prisma_1.default.user.delete({ where: { id: id } });
        res
            .clearCookie('jwt')
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'User deleted' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.deleteUser = deleteUser;
