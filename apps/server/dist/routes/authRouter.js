"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/sign-up', validationMiddleware_1.validateCreateUser, authController_1.createUser);
// router.post('/sign-up', validateCreateUser, (req, res) => {
//   res.send('Hello');
// });
router.post('/sign-in', validationMiddleware_1.validateSignIn, authController_1.logUserIn);
router.get('/sign-out', authController_1.logUserOut);
exports.default = router;
