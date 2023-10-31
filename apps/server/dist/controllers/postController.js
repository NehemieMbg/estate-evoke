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
exports.deletePost = exports.getSinglePost = exports.getPosts = exports.updatePost = exports.createPost = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs = __importStar(require("fs/promises"));
const http_status_codes_1 = require("http-status-codes");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    try {
        if (!req.file)
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Please upload an image' });
        const { path } = req.file;
        const response = yield cloudinary_1.default.v2.uploader.upload(path);
        const coverResponse = yield cloudinary_1.default.v2.uploader.upload(req.file.path, {
            transformation: [
                {
                    width: 574,
                    height: 442,
                    crop: 'fill',
                },
            ],
        });
        yield fs.unlink(req.file.path);
        const post = yield prisma_1.default.post.create({
            data: {
                title,
                description,
                authorId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                imageUrl: response.secure_url,
                imagePublicId: response.public_id,
                imageCoverUrl: coverResponse.secure_url,
                imageCoverPublicId: coverResponse.public_id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                imageCoverUrl: true,
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Post created', post });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
        else
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: error || 'Something went wrong' });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { postId } = req.params;
    try {
        yield prisma_1.default.post.update({
            where: { id: postId },
            data: { title, description },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Post updated' });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
        else
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Something went wrong' });
    }
});
exports.updatePost = updatePost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma_1.default.post.findMany({
            select: {
                author: {
                    select: {
                        username: true,
                        avatar: true,
                        name: true,
                    },
                },
                title: true,
                description: true,
                imageCoverUrl: true,
                id: true,
                views: true,
                likes: true,
                comments: true,
                createdAt: true,
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ post });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
        else
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Something went wrong' });
    }
});
exports.getPosts = getPosts;
const getSinglePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (!postId)
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'Post not found' });
    try {
        const post = yield prisma_1.default.post.findUnique({
            where: { id: postId },
            select: {
                author: {
                    select: {
                        username: true,
                        avatar: true,
                        name: true,
                    },
                },
                title: true,
                description: true,
                imageUrl: true,
                id: true,
                views: true,
                likes: true,
                comments: true,
                createdAt: true,
            },
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({ post });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
        else
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Something went wrong' });
    }
});
exports.getSinglePost = getSinglePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { postId } = req.params;
    try {
        const post = yield prisma_1.default.post.findUnique({ where: { id: postId } });
        if (!post)
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Post not found' });
        if (post.authorId !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id))
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ message: 'Not authorized' });
        yield cloudinary_1.default.v2.uploader.destroy(post.imagePublicId);
        yield prisma_1.default.post.delete({ where: { id: postId } });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Post deleted' });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message: error.message });
        else
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: 'Something went wrong' });
    }
});
exports.deletePost = deletePost;
