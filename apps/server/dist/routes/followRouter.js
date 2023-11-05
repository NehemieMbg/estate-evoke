"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followController_1 = require("../controllers/followController");
const router = (0, express_1.Router)();
router.route('/').get(followController_1.getFollows);
router.route('/:id').get(followController_1.isFollowing).post(followController_1.followUser).delete(followController_1.unfollowUser);
exports.default = router;
