"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const likeController_1 = require("../controllers/likeController");
const router = (0, express_1.Router)();
router.route('/:postId').post(likeController_1.likePost).delete(likeController_1.unlikePost).get(likeController_1.isLiking);
exports.default = router;
