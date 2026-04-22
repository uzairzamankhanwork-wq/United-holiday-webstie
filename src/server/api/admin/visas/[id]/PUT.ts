import type { Request, Response } from 'express';
import { db } from '../../../../db/client.js';
import { visas } from '../../../../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * PUT /api/admin/visas/:id
 * Update a visa service with all details
 */
export default async function handler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { 
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
      faqs
    } = req.body;

    if (!title || !description || !countries || !processingTime || !validity || !stayDuration || !price) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Update the visa with all fields
    await db
      .update(visas)
      .set({
        title,
        description,
        countries,
        processingTime,
        validity,
        stayDuration,
        price,
        image: image || '/airo-assets/images/visa/default',
        requiredDocuments: requiredDocuments || [],
        applicationProcess: applicationProcess || [],
        faqs: faqs || [],
      })
      .where(eq(visas.id, parseInt(id)));

    // Fetch updated visa
    const updated = await db
      .select()
      .from(visas)
      .where(eq(visas.id, parseInt(id)))
      .limit(1);

    res.json({ success: true, visa: updated[0] });
  } catch (error) {
    console.error('Error updating visa:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update visa', 
      message: String(error) 
    });
  }
}
