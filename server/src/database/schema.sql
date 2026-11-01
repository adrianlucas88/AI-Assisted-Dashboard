 -- create the imports table
CREATE TABLE IF NOT EXISTS imports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  file_name TEXT NOT NULL,
  file_hash TEXT NOT NULL,
  total_rows INTEGER NOT NULL,
  accepted_rows INTEGER NOT NULL,
  rejected_rows INTEGER NOT NULL,
  duplicate_rows INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
 -- create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_review_id TEXT NOT NULL UNIQUE,
  import_id INTEGER NOT NULL,
  app_name TEXT NOT NULL,
  source TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  review_date TEXT NOT NULL,
  is_duplicate INTEGER NOT NULL DEFAULT 0,
  insufficient_text INTEGER NOT NULL DEFAULT 0,
  pii_redacted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (import_id) REFERENCES imports(id) ON DELETE CASCADE
);