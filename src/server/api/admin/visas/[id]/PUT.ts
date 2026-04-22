import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { visas } from '../../../../db/schema.js';

/**
 * POST /api/admin/visas
 * Create a new visa service
 */
export default async function handler(req: Request, res: Response) {
  try {
    const {
      visaId,
      title,
      description,
      countries,
      processingTime,
      validity,
      stayDuration,
      price,
      image,
      requiredDocuments,
      applicationProcess,
      faqs,
    } = req.body;

    // Validate required fields
    if (!visaId || !title || !description || !countries || !processingTime || !validity || !stayDuration || !price || !image) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Insert new visa
    const result = await db.insert(visas).values({
      visaId,
      title,
      description,
      countries,
      processingTime,
      validity,
      stayDuration,
      price,
      image,
      requiredDocuments: requiredDocuments || [],
      applicationProcess: applicationProcess || [],
      faqs: faqs || [],
    });

    res.status(201).json({
      success: true,
      message: 'Visa created successfully',
      visaId: result[0].insertId,
    });
  } catch (error) {
    console.error('Error creating visa:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create visa',
      message: String(error),
    });
  }
}
