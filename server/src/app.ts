import express from 'express';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import type { Database } from 'better-sqlite3';

// createApp initializes the Express application 
export function createApp(db: Database): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());
// verify database connectivity
  app.get('/api/health', (_req: Request, res: Response) => {
    try {
      db.prepare('SELECT 1').get();
      res.status(200).json({
        status: 'ok',
        database: 'connected'
      });
    } catch {
      res.status(500).json({
        status: 'error',
        database: 'disconnected'
      });
    }
  });

  return app;
}