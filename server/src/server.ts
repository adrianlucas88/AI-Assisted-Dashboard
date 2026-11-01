import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createApp } from './app.js';
import { getDatabase } from './database/connection.js';
// load environment variables from .env file
dotenv.config();
// determine the filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// determine the database path and server port
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/dashboard.db');
const port = process.env.PORT || 3001;
// initialize the database and create the Express application
const db = getDatabase(dbPath);
const app = createApp(db);
// start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});