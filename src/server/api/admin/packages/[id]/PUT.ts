import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { packages } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * PUT /api/admin/packages/:id
 * Update a travel package with all details
 */
export default async function handler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { 
      name, 
      location, 
      price, 
      duration, 
      groupSize, 
      description,
      image,
      highlights,
      itinerary,
      included,
      notIncluded
    } = req.body;

    if (!name || !location || !price || !duration || !groupSize || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Update the package with all fields
    await db
      .update(packages)
      .set({
        name,
        location,
        price: parseInt(price),
        duration,
        groupSize,
        description,
        image: image || '/airo-assets/images/destinations/default',
        highlights: highlights || [],
        itinerary: itinerary || [],
        included: included || [],
        notIncluded: notIncluded || [],
      })
      .where(eq(packages.id, parseInt(id)));

    // Fetch updated package
    const updated = await db
      .select()
      .from(packages)
      .where(eq(packages.id, parseInt(id)))
      .limit(1);

    res.json({ success: true, package: updated[0] });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update package', 
      message: String(error) 
    });
  }
}
