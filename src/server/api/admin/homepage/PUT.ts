import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { homepageContent } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * PUT /api/admin/homepage
 * Update homepage content
 */
export default async function handler(req: Request, res: Response) {
  try {
    const content = req.body;

    // Check if content exists
    const existing = await db
      .select()
      .from(homepageContent)
      .where(eq(homepageContent.sectionId, 'main'))
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      await db
        .update(homepageContent)
        .set({ content })
        .where(eq(homepageContent.sectionId, 'main'));
    } else {
      // Insert new
      await db.insert(homepageContent).values({
        sectionId: 'main',
        content,
      });
    }

    res.json({ success: true, message: 'Homepage content updated successfully' });
  } catch (error) {
    console.error('Error updating homepage content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update homepage content',
      message: String(error),
    });
  }
}
