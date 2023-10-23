"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../config.env' });
// listen to uncaught exceptions event
process.on('uncaughtException', (error) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(error.name, error.message);
    process.exit(1);
});
// Listen to port
const port = process.env.PORT || 5100;
const server = app_1.default.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
// listen to unhandled Rejection event
process.on('unhandledRejection', (error) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(error.name, error.message);
    // Shutting server gracefully to give to to finish the current promises before closing connection
    server.close(() => {
        process.exit(1);
    });
});
