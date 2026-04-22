import type { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/admin/upload
 * Upload an image file to persistent storage
 */
export default async function handler(req: Request, res: Response) {
  try {
    // Check if file data is provided
    if (!req.body.file || !req.body.filename) {
      return res.status(400).json({
        success: false,
        error: 'File data and filename are required',
      });
    }

    const { file, filename, folder } = req.body;
    
    // Sanitize filename
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const folderPath = folder || 'general';
    
    // Create directory path
    const uploadDir = `/shared-storage/public/assets/uploads/${folderPath}`;
    const filePath = path.join(uploadDir, sanitizedFilename);
    
    // Ensure directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    // Handle base64 encoded file
    let fileBuffer: Buffer;
    if (file.startsWith('data:')) {
      // Extract base64 data
      const base64Data = file.split(',')[1];
      fileBuffer = Buffer.from(base64Data, 'base64');
    } else {
      fileBuffer = Buffer.from(file, 'base64');
    }
    
    // Write file
    await fs.writeFile(filePath, fileBuffer);
    
    // Return public URL
    const publicUrl = `/airo-assets/uploads/${folderPath}/${sanitizedFilename}`;
    
    res.json({
      success: true,
      message: 'File uploaded successfully',
      url: publicUrl,
      filename: sanitizedFilename,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload file',
      message: String(error),
    });
  }
}
