"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Get all users & create a user
router.route('/').get().post(userController_1.createUser);
// Get a user, update a user, delete a user
router.route('/:id').get().put().delete();
exports.default = router;
