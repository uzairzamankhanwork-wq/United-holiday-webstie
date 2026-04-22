import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { siteSettings } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * GET /api/admin/settings
 * Fetch site settings
 */
export default async function handler(req: Request, res: Response) {
  try {
    const settings = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.settingKey, 'site_config'))
      .limit(1);

    if (settings.length > 0) {
      res.json({ success: true, settings: JSON.parse(settings[0].settingValue) });
    } else {
      // Return default settings if not found
      res.json({
        success: true,
        settings: {
          contact: {
            phone: '+447418359679',
            email: 'info@unitedholidays.co.uk',
            address: 'London, United Kingdom',
            officeHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
          },
          social: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
            youtube: '',
          },
          company: {
            name: 'United Holidays',
            tagline: 'Your Journey, Our Passion',
            description: 'Premium travel agency specializing in unforgettable experiences',
            whatsappNumber: '+447418359679',
          },
        },
      });
    }
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch site settings',
      message: String(error),
    });
  }
}
