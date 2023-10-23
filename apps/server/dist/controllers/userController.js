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
exports.createUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../utils/prisma"));
const encryptedData_1 = require("../utils/encryptedData");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        res.json({ message: 'Body is missing' });
    const { email, firstName, lastName, password } = req.body;
    try {
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                firstName,
                lastName,
                password: yield (0, encryptedData_1.hashPassword)(password),
            },
        });
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: 'User created', data: user });
    }
    catch (error) {
        if (error instanceof Error)
            res.json({ message: error.message });
        else
            res.json({ message: 'Something went wrong' });
    }
});
exports.createUser = createUser;
