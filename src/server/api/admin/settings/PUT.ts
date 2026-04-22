import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { siteSettings } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * PUT /api/admin/settings
 * Update site settings
 */
export default async function handler(req: Request, res: Response) {
  try {
    const settings = req.body;

    // Check if settings exist
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, 'site_config'))
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      await db
        .update(siteSettings)
        .set({
          settingValue: JSON.stringify(settings),
        })
        .where(eq(siteSettings.settingKey, 'site_config'));
    } else {
      // Insert new
      await db.insert(siteSettings).values({
        settingKey: 'site_config',
        settingValue: JSON.stringify(settings),
        settingType: 'json',
      });
    }

    res.json({ success: true, message: 'Site settings updated successfully' });
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update site settings',
      message: String(error),
    });
  }
}
