import { describe, it, expect } from 'vitest';
import { getDatabase } from '../src/database/connection.js';

describe('Database Schema', () => {
  it('creates imports and reviews tables and enforces constraints', () => {
    const db = getDatabase(':memory:');

    const importResult = db.prepare(`
      INSERT INTO imports (file_name, file_hash, total_rows, accepted_rows, rejected_rows, duplicate_rows)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('sample.csv', 'abc123hash', 10, 8, 1, 1);

    expect(importResult.lastInsertRowid).toBe(1);

    const reviewResult = db.prepare(`
      INSERT INTO reviews (external_review_id, import_id, app_name, source, rating, review_text, review_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('rev_001', 1, 'ChatGPT', 'Google Play', 5, 'Great app for coding help.', '2024-03-01T10:00:00Z');

    expect(reviewResult.lastInsertRowid).toBe(1);

    // verify SQLite rejects an invalid rating
    expect(() => {
      db.prepare(`
        INSERT INTO reviews (external_review_id, import_id, app_name, source, rating, review_text, review_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run('rev_002', 1, 'ChatGPT', 'Google Play', 6, 'Invalid rating test', '2024-03-01T10:00:00Z');
    }).toThrow();
  });
});