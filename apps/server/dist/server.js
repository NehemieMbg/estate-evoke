"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// Connection to db
// Listen to port
app_1.default.listen(5100, () => {
    console.log('Server is listening on port 5100');
});
