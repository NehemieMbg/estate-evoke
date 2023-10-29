"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = (0, express_1.Router)();
// Get all users & create a user
router.route('/').get(userController_1.getAllUsers);
// Get a user, update a user, delete a user
router
    .route('/user')
    .get(userController_1.getCurrentUser)
    .put(validationMiddleware_1.validateUpdateUser, userController_1.updateUser)
    .delete(userController_1.deleteUser);
router
    .route('/user/credentials')
    .patch(validationMiddleware_1.validateCredentials, userController_1.updateUserCredentials);
router
    .route('/user/credentials/password')
    .patch(validationMiddleware_1.validateUpdatePassword, userController_1.updateUserPassword);
exports.default = router;
