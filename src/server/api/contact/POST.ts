import type { Request, Response } from 'express';

/**
 * Contact form submission endpoint
 * Handles quote requests from the website
 */
export default async function handler(req: Request, res: Response) {
  try {
    const { name, phone, email, destination, travelDate, message } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !destination || !travelDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    // Here you can add email sending logic
    // For now, we'll just log and return success
    console.log('Quote request received:', {
      name,
      phone,
      email,
      destination,
      travelDate,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Add email sending functionality
    // Example with nodemailer (requires email skill):
    // await sendEmail({
    //   to: 'info@unitedholidays.co.uk',
    //   subject: `New Quote Request from ${name}`,
    //   html: `
    //     <h2>New Quote Request</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Destination:</strong> ${destination}</p>
    //     <p><strong>Travel Date:</strong> ${travelDate}</p>
    //     <p><strong>Message:</strong> ${message || 'No additional message'}</p>
    //   `
    // });

    return res.status(200).json({
      success: true,
      message: 'Quote request received successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process quote request',
    });
  }
}
