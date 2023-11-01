"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteProfilePicture = exports.updateProfilePicture = exports.deleteUser = exports.updateUserPassword = exports.updateUserCredentials = exports.updateUser = exports.getCurrentUser = exports.getAllUsers = exports.getUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../utils/prisma"));
const encryptedData_1 = require("../utils/encryptedData");
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs = __importStar(require("fs/promises"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { username: req.params.username },
            select: {
                id: true,
                name: true,
                username: true,
                location: true,
                avatar: true,
                bio: true,
                link: true,
                email: true,
                posts: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        author: {
                            select: {
                                username: true,
                                name: true,
                            },
                        },
                        title: true,
                        views: true,
                        comments: true,
                        likes: true,
                        createdAt: true,
                    },
                },
            },
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: 'User found', data: user });
    }
    catch (error) {
        if (error instanceof Error)
            return res.json({ message: error.message });
        else
            return res.json({ message: 'Something went wrong' });
    }
});
exports.getUser = getUser;
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
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'User found test', data: user });
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
        const user = yield prisma_1.default.user.findUnique({
            where: { id: id },
        });
        if (user === null || user === void 0 ? void 0 : user.avatarPublicId)
            yield cloudinary_1.default.v2.uploader.destroy(user === null || user === void 0 ? void 0 : user.avatarPublicId);
        yield prisma_1.default.user.delete({ where: { id: id } });
        //! To add delete all posts of the user
        const posts = yield prisma_1.default.post.findMany({ where: { authorId: id } });
        for (const post of posts) {
            yield cloudinary_1.default.v2.uploader.destroy(post.imagePublicId);
        }
        yield prisma_1.default.post.deleteMany({ where: { authorId: id } });
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
const updateProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
        });
        if (req.file) {
            const { path } = req.file;
            const response = yield cloudinary_1.default.v2.uploader.upload(path);
            yield fs.unlink(req.file.path);
            const updatedUser = yield prisma_1.default.user.update({
                where: { id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id },
                data: {
                    avatar: response.secure_url,
                    avatarPublicId: response.public_id,
                },
            });
            if (user === null || user === void 0 ? void 0 : user.avatarPublicId) {
                yield cloudinary_1.default.v2.uploader.destroy(user.avatarPublicId);
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Profile picture updated' });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.updateProfilePicture = updateProfilePicture;
const deleteProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id },
        });
        if (user === null || user === void 0 ? void 0 : user.avatarPublicId) {
            yield cloudinary_1.default.v2.uploader.destroy(user.avatarPublicId);
        }
        yield prisma_1.default.user.update({
            where: { id: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id },
            data: {
                avatar: null,
                avatarPublicId: null,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Profile picture deleted' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.deleteProfilePicture = deleteProfilePicture;
