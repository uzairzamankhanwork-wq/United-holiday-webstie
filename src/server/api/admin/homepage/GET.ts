import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { homepageContent } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * GET /api/admin/homepage
 * Fetch homepage content
 */
export default async function handler(req: Request, res: Response) {
  try {
    const content = await db
      .select()
      .from(homepageContent)
      .where(eq(homepageContent.sectionId, 'main'))
      .limit(1);

    if (content.length > 0) {
      res.json({ success: true, content: content[0].content });
    } else {
      // Return default content if not found
      res.json({
        success: true,
        content: {
          hero: {
            title: 'Discover Your Dream Destination',
            subtitle: "Premium travel packages to the world's most beautiful destinations",
            ctaText: 'Call Now',
            ctaWhatsappText: 'WhatsApp Now',
          },
          testimonials: [],
          faqs: [],
          trustPoints: [],
        },
      });
    }
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch homepage content',
      message: String(error),
    });
  }
}
