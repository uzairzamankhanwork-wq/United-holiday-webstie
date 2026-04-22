import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { packages, visas } from '../../../db/schema.js';

/**
 * POST /api/admin/seed
 * Seed database with initial data
 * Only run once to populate the database
 */
export default async function handler(req: Request, res: Response) {
  try {
    // Check if data already exists
    const existingPackages = await db.select().from(packages);
    const existingVisas = await db.select().from(visas);

    if (existingPackages.length > 0 || existingVisas.length > 0) {
      return res.json({ 
        success: true, 
        message: 'Database already seeded',
        packagesCount: existingPackages.length,
        visasCount: existingVisas.length
      });
    }

    // Seed packages
    const packagesData = [
      {
        packageId: 'maldives',
        name: 'Maldives',
        location: 'Indian Ocean',
        price: 1299,
        rating: '4.9',
        duration: '7 Days / 6 Nights',
        groupSize: '2-10 People',
        description: 'Experience paradise in the Maldives with crystal-clear waters, pristine beaches, and luxury overwater villas.',
        image: '/airo-assets/images/destinations/dubai',
      },
      {
        packageId: 'switzerland',
        name: 'Switzerland',
        location: 'Central Europe',
        price: 1899,
        rating: '4.8',
        duration: '10 Days / 9 Nights',
        groupSize: '2-8 People',
        description: 'Discover the Swiss Alps, charming villages, and stunning mountain scenery in this unforgettable European adventure.',
        image: '/airo-assets/images/destinations/istanbul',
      },
      {
        packageId: 'makkah',
        name: 'Makkah',
        location: 'Saudi Arabia',
        price: 749,
        rating: '5.0',
        duration: '5 Days / 4 Nights',
        groupSize: '10-30 People',
        description: 'Perform Umrah in the holy city of Makkah with our comprehensive package including accommodation near Haram.',
        image: '/airo-assets/images/destinations/makkah',
      },
      {
        packageId: 'madinah',
        name: 'Madinah',
        location: 'Saudi Arabia',
        price: 699,
        rating: '5.0',
        duration: '4 Days / 3 Nights',
        groupSize: '10-30 People',
        description: 'Visit the Prophet\'s Mosque and experience the spiritual atmosphere of Madinah with our guided package.',
        image: '/airo-assets/images/destinations/madinah',
      },
      {
        packageId: 'new-york',
        name: 'New York',
        location: 'United States',
        price: 1599,
        rating: '4.7',
        duration: '6 Days / 5 Nights',
        groupSize: '2-12 People',
        description: 'Explore the Big Apple with visits to Times Square, Central Park, Statue of Liberty, and world-class museums.',
        image: '/airo-assets/images/destinations/paris',
      },
      {
        packageId: 'bali',
        name: 'Bali',
        location: 'Indonesia',
        price: 999,
        rating: '4.8',
        duration: '8 Days / 7 Nights',
        groupSize: '2-10 People',
        description: 'Immerse yourself in Balinese culture with temple visits, rice terraces, beautiful beaches, and traditional ceremonies.',
        image: '/airo-assets/images/destinations/bangkok',
      },
    ];

    for (const pkg of packagesData) {
      await db.insert(packages).values(pkg);
    }

    // Seed visas
    const visasData = [
      {
        visaId: 'schengen',
        title: 'Schengen Visa',
        description: 'Travel to 27 European countries with a single visa. Perfect for tourists and business travelers exploring Europe.',
        countries: 'France, Germany, Italy, Spain, Netherlands, Belgium, Austria, Greece, Portugal, Sweden, Denmark, Finland, Norway, Iceland, Switzerland, Czech Republic, Poland, Hungary, Slovakia, Slovenia, Estonia, Latvia, Lithuania, Luxembourg, Malta, Liechtenstein, and Monaco',
        processingTime: '15-20 working days',
        validity: 'Up to 5 years (multiple entry)',
        stayDuration: '90 days within 180 days',
        price: 'From Â£150',
        image: '/airo-assets/images/visa/schengen',
      },
      {
        visaId: 'uk',
        title: 'UK Visit Visa',
        description: 'Expert assistance for UK tourist and business visas. Visit family, explore tourist attractions, or conduct business in the United Kingdom.',
        countries: 'England, Scotland, Wales, Northern Ireland',
        processingTime: '3-4 weeks',
        validity: '6 months to 10 years',
        stayDuration: '6 months per visit',
        price: 'From Â£115',
        image: '/airo-assets/images/visa/uk',
      },
      {
        visaId: 'usa',
        title: 'US Visa',
        description: 'B1/B2 tourist and business visa application support. Visit the United States for tourism, business meetings, or visiting family.',
        countries: 'United States of America',
        processingTime: '2-4 weeks',
        validity: 'Up to 10 years',
        stayDuration: 'Up to 6 months per entry',
        price: 'From Â£185',
        image: '/airo-assets/images/visa/usa',
      },
      {
        visaId: 'canada',
        title: 'Canada Visa',
        description: 'Visitor visa and eTA application services. Explore Canada\'s natural beauty, vibrant cities, and multicultural experiences.',
        countries: 'Canada - Tourist & Business',
        processingTime: '2-4 weeks',
        validity: 'Up to 10 years',
        stayDuration: 'Up to 6 months per visit',
        price: 'From Â£100',
        image: '/airo-assets/images/visa/canada',
      },
      {
        visaId: 'turkey',
        title: 'Turkey E-Visa',
        description: 'Fast online visa processing for Turkey. Experience Istanbul\'s rich history, beautiful beaches, and delicious cuisine.',
        countries: 'Turkey - Tourist & Business',
        processingTime: '24-48 hours',
        validity: '180 days',
        stayDuration: '90 days within 180 days',
        price: 'From Â£50',
        image: '/airo-assets/images/visa/turkey',
      },
      {
        visaId: 'morocco',
        title: 'Morocco Visa',
        description: 'Visa assistance for Morocco travel. Discover the magic of Marrakech, Sahara Desert, and coastal cities.',
        countries: 'Morocco - All Entry Types',
        processingTime: '1-2 weeks',
        validity: '90 days',
        stayDuration: '90 days',
        price: 'From Â£60',
        image: '/airo-assets/images/visa/morocco',
      },
      {
        visaId: 'azerbaijan',
        title: 'Azerbaijan E-Visa',
        description: 'Electronic visa for Azerbaijan tourism. Explore Baku\'s modern architecture, ancient history, and Caspian Sea coastline.',
        countries: 'Azerbaijan - Tourist Visa',
        processingTime: '3-5 working days',
        validity: '90 days',
        stayDuration: '30 days',
        price: 'From Â£25',
        image: '/airo-assets/images/visa/azerbaijan',
      },
      {
        visaId: 'umrah-hajj',
        title: 'Umrah & Hajj Visa',
        description: 'Complete Umrah and Hajj visa packages with accommodation and guidance for your spiritual journey.',
        countries: 'Saudi Arabia - Religious Pilgrimage',
        processingTime: '1-2 weeks',
        validity: '30-90 days',
        stayDuration: 'As per package',
        price: 'Package from Â£749',
        image: '/assets/umrah-hajj.jpg',
      },
    ];

    for (const visa of visasData) {
      await db.insert(visas).values(visa);
    }

    res.json({ 
      success: true, 
      message: 'Database seeded successfully',
      packagesCount: packagesData.length,
      visasCount: visasData.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to seed database', 
      message: String(error) 
    });
  }
}
