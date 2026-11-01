import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';

// determine the filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// getDatabase initializes and returns a SQLite database connection
export function getDatabase(dbPath: string = ':memory:'): DatabaseType {
  if (dbPath !== ':memory:') {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  }
  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
  db.pragma('journal_mode = WAL');
// load and execute the schema SQL file to create tables if they don't exist
 const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schemaSql);


  return db;
}