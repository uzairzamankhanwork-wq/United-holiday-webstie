export interface Destination {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  highlights: string[];
  duration: string;
  groupSize: string;
  fullDescription: string;
  included: string[];
  notIncluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
}

export const destinations: Destination[] = [
  {
    id: 'maldives',
    name: 'Maldives',
    image: '/airo-assets/images/pages/home/maldives',
    price: 1299,
    rating: 4.9,
    location: 'Indian Ocean',
    description: 'Paradise islands with crystal-clear waters and luxury resorts',
    highlights: ['Overwater Bungalows', 'Snorkeling & Diving', 'Luxury Beach Resorts', 'Private Islands'],
    duration: '7 Days / 6 Nights',
    groupSize: '2-10 People',
    fullDescription: 'Experience the ultimate tropical paradise in the Maldives. This exclusive package includes stays in luxurious overwater bungalows, world-class diving and snorkeling experiences, and access to pristine private beaches. Enjoy romantic sunsets, spa treatments, and gourmet dining in one of the world\'s most beautiful destinations.',
    included: [
      'Round-trip flights from London',
      '6 nights in 5-star overwater bungalow',
      'Daily breakfast and dinner',
      'Airport transfers by speedboat',
      'Complimentary snorkeling equipment',
      'One spa treatment per person',
      'Sunset cruise',
      'Travel insurance'
    ],
    notIncluded: [
      'Lunch and beverages',
      'Diving certification courses',
      'Water sports activities',
      'Personal expenses',
      'Tips and gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Maldives',
        description: 'Arrive at Malé International Airport. Transfer to your resort by speedboat. Check-in to your overwater bungalow and enjoy welcome drinks. Evening at leisure to explore the resort.'
      },
      {
        day: 2,
        title: 'Beach & Water Activities',
        description: 'Breakfast at the resort. Morning snorkeling session to explore vibrant coral reefs. Afternoon at leisure on the private beach. Evening sunset cruise with refreshments.'
      },
      {
        day: 3,
        title: 'Island Hopping',
        description: 'Full-day island hopping tour visiting local islands and sandbanks. Lunch on a deserted island. Swimming and snorkeling at multiple locations. Return to resort for dinner.'
      },
      {
        day: 4,
        title: 'Spa & Relaxation',
        description: 'Morning at leisure. Complimentary spa treatment. Afternoon water sports or beach relaxation. Romantic dinner under the stars (optional upgrade).'
      },
        {
        day: 5,
        title: 'Diving Experience',
        description: 'Optional diving excursion to explore underwater caves and marine life. Afternoon free for personal activities. Evening entertainment at the resort.'
      },
      {
        day: 6,
        title: 'Leisure Day',
        description: 'Final full day to enjoy resort amenities. Optional activities include kayaking, paddleboarding, or simply relaxing on the beach. Farewell dinner at the resort.'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Breakfast and check-out. Transfer to Malé Airport for your return flight to London.'
      }
    ]
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    image: '/airo-assets/images/pages/home/switzerland',
    price: 899,
    rating: 4.8,
    location: 'Central Europe',
    description: 'Alpine adventures with stunning mountain views and charming villages',
    highlights: ['Alpine Skiing', 'Scenic Railways', 'Chocolate Tours', 'Mountain Hiking'],
    duration: '6 Days / 5 Nights',
    groupSize: '2-15 People',
    fullDescription: 'Discover the breathtaking beauty of Switzerland with this comprehensive tour package. Experience world-famous scenic train journeys, explore charming alpine villages, indulge in Swiss chocolate tastings, and enjoy spectacular mountain views. Perfect for nature lovers and adventure seekers.',
    included: [
      'Round-trip flights from London',
      '5 nights in 4-star hotels',
      'Daily breakfast',
      'Swiss Travel Pass (3 days)',
      'Jungfraujoch excursion',
      'Chocolate factory tour',
      'Airport transfers',
      'English-speaking guide'
    ],
    notIncluded: [
      'Lunch and dinner',
      'Ski equipment rental',
      'Cable car tickets (except Jungfraujoch)',
      'Personal expenses',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich',
        description: 'Arrive in Zurich. Transfer to hotel. Evening walking tour of Zurich Old Town including Bahnhofstrasse shopping street.'
      },
      {
        day: 2,
        title: 'Lucerne & Mount Pilatus',
        description: 'Train to Lucerne. Visit Chapel Bridge and Lion Monument. Afternoon excursion to Mount Pilatus by cable car. Return to Zurich.'
      },
      {
        day: 3,
        title: 'Interlaken & Jungfraujoch',
        description: 'Travel to Interlaken. Take the cogwheel train to Jungfraujoch - Top of Europe. Explore the Ice Palace and enjoy panoramic views. Overnight in Interlaken.'
      },
      {
        day: 4,
        title: 'Grindelwald & Lauterbrunnen',
        description: 'Visit the picturesque villages of Grindelwald and Lauterbrunnen. See Trümmelbach Falls. Optional paragliding or hiking. Return to Interlaken.'
      },
      {
        day: 5,
        title: 'Chocolate Tour & Bern',
        description: 'Morning chocolate factory tour with tastings. Afternoon visit to Bern, the Swiss capital. Explore the Old Town (UNESCO site) and see the famous Zytglogge clock tower.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Morning at leisure for last-minute shopping. Transfer to Zurich Airport for your return flight.'
      }
    ]
  },
  {
    id: 'makkah',
    name: 'Makkah',
    image: '/airo-assets/images/pages/home/makkah',
    price: 749,
    rating: 5.0,
    location: 'Saudi Arabia',
    description: 'Sacred pilgrimage with premium accommodation near Haram',
    highlights: ['Grand Mosque Access', 'Umrah Packages', '5-Star Hotels', 'Guided Ziyarat Tours'],
    duration: '10 Days / 9 Nights',
    groupSize: '10-40 People',
    fullDescription: 'Perform your Umrah with peace of mind. This comprehensive package includes premium accommodation near Masjid al-Haram, guided Ziyarat tours, and full support throughout your spiritual journey. Our experienced team ensures a comfortable and meaningful pilgrimage experience.',
    included: [
      'Round-trip flights from London',
      '9 nights in 5-star hotel (walking distance to Haram)',
      'Daily breakfast and dinner',
      'Umrah visa processing',
      'Airport transfers in Saudi Arabia',
      'Guided Ziyarat tours',
      'Zamzam water',
      'Ihram and travel kit',
      'Group leader support 24/7'
    ],
    notIncluded: [
      'Lunch',
      'Personal shopping',
      'Additional Ziyarat tours',
      'Laundry services',
      'Tips for guides and drivers'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Departure & Arrival',
        description: 'Depart from London. Arrive in Jeddah. Transfer to Makkah hotel. Check-in and rest. Evening orientation session.'
      },
      {
        day: 2,
        title: 'First Umrah',
        description: 'Perform your first Umrah with group guidance. Learn the rituals of Tawaf and Sa\'i. Evening prayers at Masjid al-Haram.'
      },
      {
        day: 3,
        title: 'Worship & Rest',
        description: 'Day dedicated to worship and prayers at the Haram. Optional shopping at nearby markets. Evening Taraweeh prayers.'
      },
      {
        day: 4,
        title: 'Ziyarat Tour - Part 1',
        description: 'Visit historical Islamic sites including Jabal al-Nour (Cave of Hira), Jabal Thawr, and Masjid Aisha. Return for Maghrib prayers.'
      },
      {
        day: 5,
        title: 'Ziyarat Tour - Part 2',
        description: 'Visit Jannat al-Mualla cemetery, Masjid al-Jinn, and other significant sites. Afternoon free for personal worship.'
      },
      {
        day: 6,
        title: 'Day Trip to Madinah',
        description: 'Optional day trip to Madinah to visit Masjid an-Nabawi (additional cost). Return to Makkah in the evening.'
      },
      {
        day: 7,
        title: 'Worship Day',
        description: 'Full day for personal worship, Quran recitation, and prayers. Evening group dua session.'
      },
      {
        day: 8,
        title: 'Additional Umrah',
        description: 'Perform additional Umrah. Visit Masjid Taneem. Shopping time at Abraj Al Bait mall.'
      },
      {
        day: 9,
        title: 'Final Day',
        description: 'Final prayers at the Haram. Farewell Tawaf. Pack and prepare for departure.'
      },
      {
        day: 10,
        title: 'Departure',
        description: 'Check-out and transfer to Jeddah Airport for return flight to London.'
      }
    ]
  },
  {
    id: 'madinah',
    name: 'Madinah',
    image: '/airo-assets/images/pages/home/madinah',
    price: 699,
    rating: 5.0,
    location: 'Saudi Arabia',
    description: 'Visit the Prophet\'s Mosque with comfortable stays',
    highlights: ['Prophet\'s Mosque', 'Historical Sites', 'Premium Hotels', 'Ziyarat Tours'],
    duration: '7 Days / 6 Nights',
    groupSize: '10-40 People',
    fullDescription: 'Experience the spiritual serenity of Madinah al-Munawwarah. Stay in premium hotels near Masjid an-Nabawi, visit important historical Islamic sites, and immerse yourself in the blessed city\'s peaceful atmosphere. Perfect for those seeking spiritual enrichment.',
    included: [
      'Round-trip flights from London',
      '6 nights in 5-star hotel near Masjid an-Nabawi',
      'Daily breakfast and dinner',
      'Saudi visa processing',
      'Airport transfers',
      'Guided Ziyarat tours',
      'Visit to Masjid Quba and Masjid Qiblatain',
      'Uhud Mountain tour',
      '24/7 group support'
    ],
    notIncluded: [
      'Lunch',
      'Personal expenses',
      'Shopping',
      'Additional tours',
      'Laundry services'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Madinah',
        description: 'Arrive in Madinah. Transfer to hotel near Masjid an-Nabawi. Check-in and rest. Evening prayers at the Prophet\'s Mosque.'
      },
      {
        day: 2,
        title: 'Masjid an-Nabawi',
        description: 'Full day at Masjid an-Nabawi. Pray in Riyadh al-Jannah. Visit the Prophet\'s grave. Learn about the mosque\'s history and significance.'
      },
      {
        day: 3,
        title: 'Historical Mosques',
        description: 'Morning visit to Masjid Quba (first mosque in Islam). Afternoon visit to Masjid Qiblatain. Evening prayers at Masjid an-Nabawi.'
      },
      {
        day: 4,
        title: 'Uhud & Martyrs',
        description: 'Visit Mount Uhud and the graves of martyrs. Learn about the Battle of Uhud. Visit the Seven Mosques. Return for evening prayers.'
      },
      {
        day: 5,
        title: 'Ziyarat Tour',
        description: 'Comprehensive Ziyarat tour including Jannat al-Baqi cemetery, date farms, and other historical sites. Shopping time at local markets.'
      },
      {
        day: 6,
        title: 'Worship & Reflection',
        description: 'Final full day for personal worship and prayers. Farewell prayers at Masjid an-Nabawi. Group dua session.'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Morning prayers. Check-out and transfer to Madinah Airport for return flight to London.'
      }
    ]
  },
  {
    id: 'newyork',
    name: 'New York',
    image: '/airo-assets/images/pages/home/newyork',
    price: 1099,
    rating: 4.7,
    location: 'United States',
    description: 'The city that never sleeps with iconic landmarks',
    highlights: ['Times Square', 'Statue of Liberty', 'Central Park', 'Broadway Shows'],
    duration: '6 Days / 5 Nights',
    groupSize: '2-12 People',
    fullDescription: 'Experience the energy and excitement of New York City. This package includes visits to all major attractions, a Broadway show, and plenty of free time to explore the city\'s diverse neighborhoods, world-class museums, and incredible dining scene.',
    included: [
      'Round-trip flights from London',
      '5 nights in 4-star Manhattan hotel',
      'Daily breakfast',
      'Statue of Liberty & Ellis Island tour',
      'Empire State Building tickets',
      'One Broadway show ticket',
      'Hop-on Hop-off bus pass (2 days)',
      'Airport transfers'
    ],
    notIncluded: [
      'Lunch and dinner',
      'Additional show tickets',
      'Museum entrance fees',
      'Personal expenses',
      'Travel insurance',
      'Tips and gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Times Square',
        description: 'Arrive in New York. Transfer to Manhattan hotel. Evening walk through Times Square. Welcome dinner (optional).'
      },
      {
        day: 2,
        title: 'Statue of Liberty & Downtown',
        description: 'Morning ferry to Statue of Liberty and Ellis Island. Afternoon visit to 9/11 Memorial. Walk across Brooklyn Bridge. Evening in DUMBO neighborhood.'
      },
      {
        day: 3,
        title: 'Midtown Manhattan',
        description: 'Visit Empire State Building. Walk through Bryant Park and Grand Central Terminal. Afternoon shopping on Fifth Avenue. Evening Broadway show.'
      },
      {
        day: 4,
        title: 'Central Park & Museums',
        description: 'Morning in Central Park. Visit Metropolitan Museum of Art or American Museum of Natural History. Afternoon at leisure. Evening in Greenwich Village.'
      },
      {
        day: 5,
        title: 'Hop-on Hop-off Tour',
        description: 'Full day using hop-on hop-off bus to explore neighborhoods like SoHo, Chelsea, Upper West Side. Visit Rockefeller Center. Top of the Rock observation deck (optional).'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Morning at leisure for last-minute shopping or sightseeing. Transfer to JFK Airport for return flight.'
      }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    image: '/airo-assets/images/pages/home/bali',
    price: 849,
    rating: 4.8,
    location: 'Indonesia',
    description: 'Tropical paradise with temples, beaches, and culture',
    highlights: ['Beach Resorts', 'Temple Tours', 'Rice Terraces', 'Spa & Wellness'],
    duration: '8 Days / 7 Nights',
    groupSize: '2-10 People',
    fullDescription: 'Discover the magic of Bali with this comprehensive tour covering beaches, temples, rice terraces, and cultural experiences. Enjoy luxury beach resorts, traditional Balinese spa treatments, and authentic local cuisine. Perfect for couples and families seeking relaxation and adventure.',
    included: [
      'Round-trip flights from London',
      '7 nights in 4-star beach resorts',
      'Daily breakfast',
      'Airport transfers',
      'Ubud cultural tour',
      'Tanah Lot temple visit',
      'Tegallalang rice terraces tour',
      'Traditional Balinese massage',
      'Cooking class'
    ],
    notIncluded: [
      'Lunch and dinner',
      'Water sports activities',
      'Additional spa treatments',
      'Personal expenses',
      'Travel insurance',
      'Tips for guides'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali',
        description: 'Arrive in Denpasar. Transfer to beach resort in Seminyak. Check-in and relax. Evening welcome dinner at the resort.'
      },
      {
        day: 2,
        title: 'Ubud Cultural Tour',
        description: 'Full-day tour to Ubud. Visit Tegallalang rice terraces, Ubud Monkey Forest, and Ubud Palace. Traditional Balinese lunch. Visit art markets. Return to resort.'
      },
      {
        day: 3,
        title: 'Beach Day & Spa',
        description: 'Morning at leisure on Seminyak Beach. Afternoon traditional Balinese massage and spa treatment. Evening beach sunset.'
      },
      {
        day: 4,
        title: 'Temple Tour',
        description: 'Visit Tanah Lot temple for sunrise. Explore Uluwatu Temple. Watch traditional Kecak fire dance performance. Seafood dinner at Jimbaran Beach.'
      },
      {
        day: 5,
        title: 'Water Activities',
        description: 'Optional water sports: surfing lessons, snorkeling, or diving. Afternoon at leisure. Evening cooking class to learn Balinese cuisine.'
      },
      {
        day: 6,
        title: 'Nusa Penida Day Trip',
        description: 'Optional full-day trip to Nusa Penida island. Visit Kelingking Beach, Angel\'s Billabong, and Broken Beach. Snorkeling with manta rays.'
      },
      {
        day: 7,
        title: 'Leisure Day',
        description: 'Final full day at leisure. Optional activities: yoga class, beach club, or shopping in Seminyak. Farewell dinner.'
      },
      {
        day: 8,
        title: 'Departure',
        description: 'Breakfast and check-out. Transfer to Denpasar Airport for return flight to London.'
      }
    ]
  }
];

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find(dest => dest.id === id);
}
