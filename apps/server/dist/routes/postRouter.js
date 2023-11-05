"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const postController_1 = require("../controllers/postController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const multerMiddleware_1 = __importDefault(require("../middlewares/multerMiddleware"));
const router = (0, express_1.Router)();
router
    .route('/')
    .get(postController_1.getPosts)
    .post(authMiddleware_1.authMiddleware, multerMiddleware_1.default.single('image'), validationMiddleware_1.validatePost, postController_1.createPost);
router.route('/following').get(authMiddleware_1.authMiddleware, postController_1.getFollowingPosts);
router
    .route('/:postId')
    .get(postController_1.getSinglePost)
    .patch(authMiddleware_1.authMiddleware, validationMiddleware_1.validateUpdatePost, postController_1.updatePost);
exports.default = router;
