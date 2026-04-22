import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { packages } from '../../db/schema.js';

/**
 * GET /api/packages
 * Public endpoint - Fetch all travel packages
 */
export default async function handler(req: Request, res: Response) {
  try {
    const allPackages = await db.select().from(packages);
    res.json({ success: true, packages: allPackages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch packages',
      message: String(error),
    });
  }
}
