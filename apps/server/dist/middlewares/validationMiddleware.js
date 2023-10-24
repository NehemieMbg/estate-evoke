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
exports.validateSignIn = exports.validateUpdateUser = exports.validateCreateUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_js_1 = __importDefault(require("../utils/prisma.js"));
const validateCreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    const user = yield prisma_js_1.default.user.findUnique({ where: { email } });
    if (!email)
        errors.push('Email is required');
    if (user)
        errors.push('Email already exists');
    if (!firstName)
        errors.push('First name is required');
    if (!lastName)
        errors.push('Last name is required');
    if (!password)
        errors.push('Password is required');
    if (!confirmPassword)
        errors.push('Confirm password is required');
    if (errors.length > 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: errors.join(', ') });
    }
    next();
});
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const { firstName, lastName, bio, link } = req.body;
    if (!firstName)
        errors.push('First name is required');
    if (!lastName)
        errors.push('Last name is required');
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
const validateSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const { email, password } = req.body;
    if (!email)
        errors.push('Email is required');
    if (!password)
        errors.push('Password is required');
    if (errors.length > 0) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: errors.join(', ') });
    }
    next();
});
exports.validateSignIn = validateSignIn;
