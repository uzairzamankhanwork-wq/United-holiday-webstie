import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { packages } from '../../../../db/schema.js';

/**
 * POST /api/admin/packages
 * Create a new travel package
 */
export default async function handler(req: Request, res: Response) {
  try {
    const {
      packageId,
      name,
      location,
      price,
      rating,
      duration,
      groupSize,
      description,
      image,
      highlights,
      itinerary,
      included,
      notIncluded,
    } = req.body;

    // Validate required fields
    if (!packageId || !name || !location || !price || !rating || !duration || !groupSize || !description || !image) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Insert new package
    const result = await db.insert(packages).values({
      packageId,
      name,
      location,
      price: parseInt(price),
      rating: rating.toString(),
      duration,
      groupSize,
      description,
      image,
      highlights: highlights || [],
      itinerary: itinerary || [],
      included: included || [],
      notIncluded: notIncluded || [],
    });

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      packageId: result[0].insertId,
    });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create package',
      message: String(error),
    });
  }
}
