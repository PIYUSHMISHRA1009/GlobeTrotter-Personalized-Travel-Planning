/*
 * FILE: server.js
 * PURPOSE: Server entry point with database connection
 */

const app = require('./app');
const connectDB = require('./config/db');

const PORT = 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();