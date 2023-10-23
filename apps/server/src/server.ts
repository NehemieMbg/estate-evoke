import app from './app';
import dotenv from 'dotenv';
dotenv.config({ path: '../config.env' });

// listen to uncaught exceptions event
process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(error.name, error.message);
  process.exit(1);
});

// Listen to port
const port = process.env.PORT || 5100;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// listen to unhandled Rejection event
process.on('unhandledRejection', (error: Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(error.name, error.message);

  // Shutting server gracefully to give to to finish the current promises before closing connection
  server.close(() => {
    process.exit(1);
  });
});
