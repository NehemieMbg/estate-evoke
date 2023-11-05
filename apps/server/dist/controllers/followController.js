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
exports.isFollowing = exports.getFollows = exports.unfollowUser = exports.followUser = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const http_status_codes_1 = require("http-status-codes");
const followUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.follow.create({
            data: {
                followerId: req.user.id,
                followingId: id,
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'User followed' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.followUser = followUser;
const unfollowUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: req.user.id,
                    followingId: id,
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'User unfollowed' });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.unfollowUser = unfollowUser;
const getFollows = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('get follows');
});
exports.getFollows = getFollows;
const isFollowing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const isFollowing = yield prisma_1.default.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: req.user.id,
                    followingId: id,
                },
            },
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ isFollowing: !!isFollowing });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.isFollowing = isFollowing;
