import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { packages } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * DELETE /api/admin/packages/:id
 * Delete a travel package
 */
export default async function handler(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Package ID is required',
      });
    }

    // Delete the package
    await db.delete(packages).where(eq(packages.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Package deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete package',
      message: String(error),
    });
  }
}
