import Database from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';

// getDatabase initializes and returns a new SQLite database connection
export function getDatabase(dbPath: string = ':memory:'): DatabaseType {
  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');
  db.pragma('journal_mode = WAL');
  return db;
}