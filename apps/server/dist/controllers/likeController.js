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
exports.isLiking = exports.unlikePost = exports.likePost = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const http_status_codes_1 = require("http-status-codes");
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        yield prisma_1.default.like.create({
            data: {
                postId: postId,
                userId: req.user.id,
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Post liked' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.likePost = likePost;
const unlikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        yield prisma_1.default.like.delete({
            where: {
                userId_postId: {
                    postId: postId,
                    userId: req.user.id,
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Post unliked' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.unlikePost = unlikePost;
const isLiking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (!req.user)
        res
            .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
            .json({ message: 'You must be connected!' });
    try {
        const isLiking = yield prisma_1.default.like.findUnique({
            where: {
                userId_postId: {
                    userId: req.user.id,
                    postId: postId,
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ isLiking: isLiking ? true : false });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.isLiking = isLiking;
