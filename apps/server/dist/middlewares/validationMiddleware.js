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
exports.validateUpdatePassword = exports.validateUpdateEmail = exports.validateSignIn = exports.validateUpdateUser = exports.validateCreateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_js_1 = __importDefault(require("../utils/prisma.js"));
const encryptedData_js_1 = require("../utils/encryptedData.js");
//? Validates user data when creating it
const validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const { email, name, username, password, confirmPassword } = req.body;
    const user = yield prisma_js_1.default.user.findUnique({ where: { email } });
    const usernameExists = yield prisma_js_1.default.user.findUnique({ where: { username } });
    if (!email)
        errors.push('Email is required');
    if (user)
        errors.push('Email already exists');
    if (usernameExists)
        errors.push('Username already exists');
    if (!name)
        errors.push('Name is required');
    if (!username)
        errors.push('Username is required');
    if (!password)
        errors.push('Password is required');
    if (!confirmPassword)
        errors.push('Confirm password is required');
    req.body.username = String(username).toLowerCase();
    req.body.email = String(email).toLowerCase();
    if (errors.length > 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: errors.join(', ') });
    }
    next();
});
exports.validateCreateUser = validateCreateUser;
//? Validates user data when updating it
const validateUpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const { name, bio, link } = req.body;
    const username = req.body.username.toLowerCase();
    const user = yield prisma_js_1.default.user.findUnique({ where: { username } });
    if (!name)
        errors.push('Name is required');
    if (!username)
        errors.push('Username is required');
    if (user && req.user.username !== user.username)
        errors.push('Username already exists');
    if (bio && typeof bio !== 'string')
        errors.push('Bio must be a string');
    if (bio && bio.length > 150)
        errors.push(`Bio must be less than 150 chars. Current length: ${bio.length}`);
    if (link && typeof link !== 'string')
        errors.push('Link must be a string');
    //! To add: check if link is a valid URL (Safe URL)
    if (errors.length > 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: errors.join(', ') });
    }
    next();
});
exports.validateUpdateUser = validateUpdateUser;
//? Validates user email and password when logging in
const validateSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    let email = '';
    let username = '';
    const { identification, password } = req.body;
    if (!identification)
        errors.push('Email or username is required');
    if (String(identification).includes('@'))
        email = String(identification).toLowerCase();
    else
        username = String(identification).toLowerCase();
    if (!password)
        errors.push('Password is required');
    req.body.email = email;
    req.body.username = username;
    if (errors.length > 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: errors.join(', ') });
    }
    next();
});
exports.validateSignIn = validateSignIn;
//? Validates user email when updating it
const validateUpdateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { email } = req.body;
    if (!email)
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'Email is required' });
    const user = yield prisma_js_1.default.user.findUnique({ where: { email } });
    // ? Check if email already exists and if it's not the user's email
    if (user && user.id !== id)
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: 'Email already exists' });
    req.body.email = email.toLowerCase();
    next();
});
exports.validateUpdateEmail = validateUpdateEmail;
//? Validates user password when updating it
const validateUpdatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, confirmPassword, newPassword } = req.body;
    const errors = [];
    const { id } = req.user;
    //? Check user inputs
    if (!password)
        errors.push('Password is required');
    if (!confirmPassword)
        errors.push('Confirm password is required');
    if (!newPassword)
        errors.push('New password is required');
    const user = yield prisma_js_1.default.user.findUnique({ where: { id } });
    //? Check if old password is correct
    if (!(yield (0, encryptedData_js_1.comparePassword)(password, user.password))) {
        errors.push('Wrong credentials');
    }
    //? Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        errors.push('Passwords do not match');
    }
    //? Return errors if any
    if (errors.length > 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: errors.join(', ') });
    }
    next();
});
exports.validateUpdatePassword = validateUpdatePassword;
