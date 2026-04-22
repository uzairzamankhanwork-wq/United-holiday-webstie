import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { visas } from '../../db/schema.js';

/**
 * GET /api/visas
 * Public endpoint - Fetch all visa services
 */
export default async function handler(req: Request, res: Response) {
  try {
    const allVisas = await db.select().from(visas);
    res.json({ success: true, visas: allVisas });
  } catch (error) {
    console.error('Error fetching visas:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch visas',
      message: String(error),
    });
  }
}
