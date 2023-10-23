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
exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
const customErrors_js_1 = require("../errors/customErrors.js");
const prisma_js_1 = __importDefault(require("../utils/prisma.js"));
const withValidationErrors = (validatesValue) => {
    // Return a single RequestHandler function
    const validationMiddleware = Array.isArray(validatesValue)
        ? validatesValue
        : [validatesValue];
    return (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            const errorMessage = errorMessages.join(', ');
            console.log(errorMessages);
            throw new customErrors_js_1.BadRequestError(errorMessage);
        }
        next();
    };
};
exports.validateCreateUser = withValidationErrors([
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email must be valid')
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield prisma_js_1.default.user.findUnique({ where: { email } });
        if (user)
            throw new Error('Email already exists');
    })),
    (0, express_validator_1.body)('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .custom((firstName) => {
        if (typeof firstName !== 'string')
            throw new Error('First name must be a string');
    }),
    (0, express_validator_1.body)('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .custom((lastName) => {
        if (typeof lastName !== 'string')
            throw new Error('Last name must be a string');
    }),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    (0, express_validator_1.body)('confirmPassword')
        .notEmpty()
        .withMessage('Confirm password is required')
        .custom((confirmPassword, { req }) => {
        if (confirmPassword !== req.body.password)
            throw new Error('Passwords do not match');
    }),
]);
