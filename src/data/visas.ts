export interface Visa {
  id: string;
  title: string;
  description: string;
  countries: string;
  image: string;
  processingTime: string;
  validity: string;
  stayDuration: string;
  price: string;
  requirements: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const visas: Visa[] = [
  {
    id: 'schengen',
    title: 'Schengen Visa',
    description: 'Travel to 27 European countries with a single visa. Perfect for tourists and business travelers exploring Europe.',
    countries: 'France, Germany, Italy, Spain, Netherlands, Belgium, Austria, Greece, Portugal, Sweden, Denmark, Finland, Norway, Iceland, Switzerland, Czech Republic, Poland, Hungary, Slovakia, Slovenia, Estonia, Latvia, Lithuania, Luxembourg, Malta, Liechtenstein, and Monaco',
    image: '/airo-assets/images/visa/schengen',
    processingTime: '15-20 working days',
    validity: 'Up to 5 years (multiple entry)',
    stayDuration: '90 days within 180 days',
    price: 'From £150',
    requirements: [
      'Valid UK passport (minimum 6 months validity)',
      'Completed visa application form',
      'Two recent passport-sized photographs',
      'Travel insurance (minimum €30,000 coverage)',
      'Proof of accommodation (hotel bookings)',
      'Flight itinerary (round-trip)',
      'Bank statements (last 3 months)',
      'Employment letter or business documents',
      'Cover letter explaining purpose of visit',
      'Previous Schengen visas (if applicable)'
    ],
    process: [
      {
        step: 1,
        title: 'Consultation',
        description: 'Contact us to discuss your travel plans. We\'ll assess your requirements and provide guidance on the best visa type for your needs.'
      },
      {
        step: 2,
        title: 'Document Collection',
        description: 'We\'ll provide you with a complete checklist of required documents. Our team will review your documents to ensure everything is in order.'
      },
      {
        step: 3,
        title: 'Application Preparation',
        description: 'We\'ll complete your visa application form, prepare your cover letter, and organize all supporting documents professionally.'
      },
      {
        step: 4,
        title: 'Appointment Booking',
        description: 'We\'ll book your biometric appointment at the visa application center and provide you with all necessary details.'
      },
      {
        step: 5,
        title: 'Biometrics & Submission',
        description: 'Attend your appointment for fingerprints and photo. We can accompany you if needed. Your application will be submitted to the embassy.'
      },
      {
        step: 6,
        title: 'Visa Collection',
        description: 'Once approved, we\'ll collect your passport with the visa and deliver it to you. You\'re ready to travel!'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to get a Schengen visa?',
        answer: 'Processing typically takes 15-20 working days from the date of your biometric appointment. During peak seasons, it may take slightly longer. We recommend applying at least 4-6 weeks before your travel date.'
      },
      {
        question: 'Can I visit all 27 Schengen countries with one visa?',
        answer: 'Yes! A Schengen visa allows you to travel freely within all 27 member countries. You should apply through the embassy of the country where you\'ll spend the most time or your first point of entry.'
      },
      {
        question: 'What if my visa application is rejected?',
        answer: 'If your application is rejected, you have the right to appeal. We\'ll review the rejection reasons and help you prepare a stronger application or appeal if appropriate.'
      },
      {
        question: 'Do I need travel insurance?',
        answer: 'Yes, travel insurance with minimum coverage of €30,000 is mandatory for Schengen visa applications. We can help you obtain suitable insurance.'
      }
    ]
  },
  {
    id: 'uk',
    title: 'UK Visit Visa',
    description: 'Expert assistance for UK tourist and business visas. Visit family, explore tourist attractions, or conduct business in the United Kingdom.',
    countries: 'England, Scotland, Wales, Northern Ireland',
    image: '/airo-assets/images/visa/uk',
    processingTime: '3-4 weeks',
    validity: '6 months to 10 years',
    stayDuration: '6 months per visit',
    price: 'From £115',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Completed online visa application',
      'Recent passport photograph',
      'Bank statements (last 6 months)',
      'Employment letter and payslips',
      'Proof of accommodation in UK',
      'Travel itinerary',
      'Invitation letter (if visiting family/friends)',
      'Previous UK visas (if applicable)',
      'Proof of ties to home country'
    ],
    process: [
      {
        step: 1,
        title: 'Initial Consultation',
        description: 'We\'ll discuss your purpose of visit and assess your eligibility for a UK visit visa.'
      },
      {
        step: 2,
        title: 'Online Application',
        description: 'We\'ll complete your online visa application form on the UK government website with accurate information.'
      },
      {
        step: 3,
        title: 'Document Preparation',
        description: 'Our team will prepare all supporting documents, including cover letter, financial evidence, and travel plans.'
      },
      {
        step: 4,
        title: 'Biometric Appointment',
        description: 'We\'ll book your appointment at the visa application center for biometrics and document submission.'
      },
      {
        step: 5,
        title: 'Application Submission',
        description: 'Attend your appointment to provide fingerprints, photograph, and submit your documents.'
      },
      {
        step: 6,
        title: 'Decision & Collection',
        description: 'Receive your decision via email. Collect your passport with visa from the application center or via courier.'
      }
    ],
    faqs: [
      {
        question: 'How long can I stay in the UK with a visit visa?',
        answer: 'A standard UK visit visa allows you to stay for up to 6 months per visit. Long-term visit visas (2, 5, or 10 years) allow multiple visits of up to 6 months each.'
      },
      {
        question: 'Can I work on a UK visit visa?',
        answer: 'No, you cannot work or study on a UK visit visa. It\'s strictly for tourism, visiting family/friends, or short business activities like meetings and conferences.'
      },
      {
        question: 'What are the financial requirements?',
        answer: 'You need to show sufficient funds to cover your stay in the UK and return journey. Generally, bank statements showing regular income and savings are required.'
      },
      {
        question: 'Can I extend my UK visit visa?',
        answer: 'In most cases, you cannot extend a UK visit visa. You must leave the UK before your visa expires and apply for a new visa if you wish to return.'
      }
    ]
  },
  {
    id: 'usa',
    title: 'US Visa',
    description: 'B1/B2 tourist and business visa application support. Visit the United States for tourism, business meetings, or visiting family.',
    countries: 'United States of America',
    image: '/airo-assets/images/visa/usa',
    processingTime: '2-4 weeks',
    validity: 'Up to 10 years',
    stayDuration: 'Up to 6 months per entry',
    price: 'From £185',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Completed DS-160 form',
      'Visa application fee payment receipt',
      'Recent photograph (specific US requirements)',
      'Interview appointment confirmation',
      'Bank statements and financial documents',
      'Employment verification letter',
      'Travel itinerary and accommodation proof',
      'Previous US visas (if applicable)',
      'Proof of ties to home country',
      'Supporting documents for purpose of visit'
    ],
    process: [
      {
        step: 1,
        title: 'Consultation & Assessment',
        description: 'We\'ll evaluate your case and determine the best approach for your US visa application.'
      },
      {
        step: 2,
        title: 'DS-160 Form Completion',
        description: 'We\'ll complete your DS-160 online application form with accurate information and upload your photograph.'
      },
      {
        step: 3,
        title: 'Fee Payment & Scheduling',
        description: 'Pay the visa application fee and schedule your interview appointment at the US Embassy in London.'
      },
      {
        step: 4,
        title: 'Interview Preparation',
        description: 'We\'ll prepare you for the visa interview with mock sessions and provide guidance on common questions.'
      },
      {
        step: 5,
        title: 'Embassy Interview',
        description: 'Attend your interview at the US Embassy with all required documents. Be confident and honest in your answers.'
      },
      {
        step: 6,
        title: 'Visa Issuance',
        description: 'If approved, your passport will be returned with the visa within 5-7 working days via courier.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between B1 and B2 visa?',
        answer: 'B1 is for business purposes (meetings, conferences, negotiations) while B2 is for tourism and visiting family. Most applicants receive a combined B1/B2 visa allowing both purposes.'
      },
      {
        question: 'How should I prepare for the visa interview?',
        answer: 'Be honest, confident, and concise. Bring all required documents, dress professionally, and clearly explain your purpose of visit and ties to your home country. We provide comprehensive interview preparation.'
      },
      {
        question: 'What if my US visa is denied?',
        answer: 'If denied, you\'ll receive a reason. You can reapply anytime with stronger documentation. We\'ll help you understand the rejection and prepare a better application.'
      },
      {
        question: 'How long is a US visa valid?',
        answer: 'US tourist visas are typically issued for 10 years with multiple entries. However, each stay is limited to 6 months as determined by the immigration officer at entry.'
      }
    ]
  },
  {
    id: 'canada',
    title: 'Canada Visa',
    description: 'Visitor visa and eTA application services. Explore Canada\'s natural beauty, vibrant cities, and multicultural experiences.',
    countries: 'Canada - Tourist & Business',
    image: '/airo-assets/images/visa/canada',
    processingTime: '2-4 weeks',
    validity: 'Up to 10 years',
    stayDuration: 'Up to 6 months per visit',
    price: 'From £100',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Completed online application (IMM 5257)',
      'Digital photograph (specific requirements)',
      'Proof of financial support',
      'Employment letter and payslips',
      'Travel itinerary',
      'Accommodation details',
      'Purpose of visit letter',
      'Family information form (IMM 5645)',
      'Previous travel history',
      'Biometrics (fingerprints and photo)'
    ],
    process: [
      {
        step: 1,
        title: 'Eligibility Assessment',
        description: 'We\'ll determine if you need a visitor visa or eTA (Electronic Travel Authorization) based on your nationality and travel purpose.'
      },
      {
        step: 2,
        title: 'Online Application',
        description: 'Complete the online application form (IMM 5257) and upload all required documents to the IRCC portal.'
      },
      {
        step: 3,
        title: 'Document Submission',
        description: 'Prepare and submit all supporting documents including financial proof, employment details, and travel plans.'
      },
      {
        step: 4,
        title: 'Biometrics Appointment',
        description: 'Book and attend biometrics appointment at the visa application center for fingerprints and photograph.'
      },
      {
        step: 5,
        title: 'Application Processing',
        description: 'IRCC will process your application. Processing time is typically 2-4 weeks but can vary.'
      },
      {
        step: 6,
        title: 'Decision & Passport Return',
        description: 'Receive decision via email. If approved, your passport will be returned with the visa via courier.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between a visitor visa and eTA?',
        answer: 'eTA is for visa-exempt nationals traveling by air (costs CAD $7, processed in minutes). A visitor visa is for nationals who require a visa (costs CAD $100, takes 2-4 weeks).'
      },
      {
        question: 'Do I need biometrics for Canada visa?',
        answer: 'Yes, most applicants need to provide biometrics (fingerprints and photo) at a visa application center. Biometrics are valid for 10 years.'
      },
      {
        question: 'Can I work on a Canada visitor visa?',
        answer: 'No, a visitor visa does not allow you to work in Canada. You can only engage in tourism, visiting family, or short business activities like meetings.'
      },
      {
        question: 'How much money do I need to show for Canada visa?',
        answer: 'You should show sufficient funds to cover your stay. Generally, CAD $1,000-2,000 per month of stay is recommended, plus return airfare costs.'
      }
    ]
  },
  {
    id: 'turkey',
    title: 'Turkey E-Visa',
    description: 'Fast online visa processing for Turkey. Experience Istanbul\'s rich history, beautiful beaches, and delicious cuisine.',
    countries: 'Turkey - Tourist & Business',
    image: '/airo-assets/images/visa/turkey',
    processingTime: '24-48 hours',
    validity: '180 days',
    stayDuration: '90 days within 180 days',
    price: 'From £50',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Email address for visa delivery',
      'Credit/debit card for payment',
      'Return flight ticket',
      'Hotel reservation or accommodation proof',
      'Travel insurance (recommended)',
      'Passport bio page scan'
    ],
    process: [
      {
        step: 1,
        title: 'Online Application',
        description: 'Complete the simple online e-visa application form on the official Turkish government website.'
      },
      {
        step: 2,
        title: 'Document Upload',
        description: 'Upload a scan of your passport bio page and provide your travel details.'
      },
      {
        step: 3,
        title: 'Payment',
        description: 'Pay the visa fee securely online using credit or debit card.'
      },
      {
        step: 4,
        title: 'Processing',
        description: 'Your application will be processed within 24-48 hours. Most applications are approved instantly.'
      },
      {
        step: 5,
        title: 'E-Visa Delivery',
        description: 'Receive your e-visa via email. Print it out and carry it with you when traveling to Turkey.'
      },
      {
        step: 6,
        title: 'Travel to Turkey',
        description: 'Present your printed e-visa along with your passport at Turkish immigration upon arrival.'
      }
    ],
    faqs: [
      {
        question: 'How quickly can I get a Turkey e-visa?',
        answer: 'Most Turkey e-visas are approved within 24-48 hours. Some applications may be approved instantly. We recommend applying at least 3-5 days before travel.'
      },
      {
        question: 'Do I need to print the e-visa?',
        answer: 'Yes, you must print your e-visa and present it at immigration along with your passport. Keep a digital copy on your phone as backup.'
      },
      {
        question: 'Can I extend my Turkey e-visa?',
        answer: 'No, e-visas cannot be extended. If you wish to stay longer, you must leave Turkey and apply for a new visa.'
      },
      {
        question: 'Is travel insurance required for Turkey?',
        answer: 'While not mandatory for the e-visa, travel insurance is highly recommended for medical emergencies and trip cancellations.'
      }
    ]
  },
  {
    id: 'morocco',
    title: 'Morocco Visa',
    description: 'Visa assistance for Morocco travel. Discover the magic of Marrakech, Sahara Desert, and coastal cities.',
    countries: 'Morocco - All Entry Types',
    image: '/airo-assets/images/visa/morocco',
    processingTime: '1-2 weeks',
    validity: '90 days',
    stayDuration: '90 days',
    price: 'From £60',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Completed visa application form',
      'Two recent passport photographs',
      'Flight reservation (round-trip)',
      'Hotel booking confirmation',
      'Bank statements (last 3 months)',
      'Travel insurance',
      'Cover letter stating purpose of visit',
      'Employment letter',
      'Proof of accommodation'
    ],
    process: [
      {
        step: 1,
        title: 'Consultation',
        description: 'Contact us to discuss your Morocco travel plans. We\'ll guide you through the visa requirements.'
      },
      {
        step: 2,
        title: 'Application Form',
        description: 'Complete the Morocco visa application form with accurate personal and travel information.'
      },
      {
        step: 3,
        title: 'Document Collection',
        description: 'Gather all required documents including passport, photographs, financial proof, and travel bookings.'
      },
      {
        step: 4,
        title: 'Submission',
        description: 'We\'ll submit your complete application to the Moroccan consulate on your behalf.'
      },
      {
        step: 5,
        title: 'Processing',
        description: 'The consulate will process your application. This typically takes 1-2 weeks.'
      },
      {
        step: 6,
        title: 'Visa Collection',
        description: 'Once approved, we\'ll collect your passport with the visa and deliver it to you.'
      }
    ],
    faqs: [
      {
        question: 'Do UK citizens need a visa for Morocco?',
        answer: 'UK citizens can visit Morocco visa-free for up to 90 days for tourism. However, if you\'re traveling for work or other purposes, you may need a visa.'
      },
      {
        question: 'What is the best time to visit Morocco?',
        answer: 'Spring (March-May) and autumn (September-November) offer pleasant weather. Summer can be very hot, especially in the desert regions.'
      },
      {
        question: 'Is Morocco safe for tourists?',
        answer: 'Yes, Morocco is generally safe for tourists. Exercise normal precautions, be aware of your surroundings, and respect local customs and traditions.'
      },
      {
        question: 'What currency is used in Morocco?',
        answer: 'The Moroccan Dirham (MAD) is the official currency. Credit cards are widely accepted in cities, but carry cash for smaller establishments and markets.'
      }
    ]
  },
  {
    id: 'azerbaijan',
    title: 'Azerbaijan E-Visa',
    description: 'Electronic visa for Azerbaijan tourism. Explore Baku\'s modern architecture, ancient history, and Caspian Sea coastline.',
    countries: 'Azerbaijan - Tourist Visa',
    image: '/airo-assets/images/visa/azerbaijan',
    processingTime: '3-5 working days',
    validity: '90 days',
    stayDuration: '30 days',
    price: 'From £25',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Passport bio page scan (color)',
      'Recent digital photograph',
      'Email address',
      'Credit/debit card for payment',
      'Travel insurance (recommended)',
      'Hotel booking confirmation'
    ],
    process: [
      {
        step: 1,
        title: 'Online Application',
        description: 'Complete the e-visa application on the official Azerbaijan e-visa portal (evisa.gov.az).'
      },
      {
        step: 2,
        title: 'Upload Documents',
        description: 'Upload a clear scan of your passport bio page and a recent digital photograph.'
      },
      {
        step: 3,
        title: 'Payment',
        description: 'Pay the visa fee online using credit or debit card. Keep the payment receipt.'
      },
      {
        step: 4,
        title: 'Processing',
        description: 'Your application will be processed within 3-5 working days. You\'ll receive updates via email.'
      },
      {
        step: 5,
        title: 'E-Visa Approval',
        description: 'Once approved, download your e-visa from the portal and via the email link.'
      },
      {
        step: 6,
        title: 'Travel',
        description: 'Print your e-visa and present it at Azerbaijan immigration along with your passport.'
      }
    ],
    faqs: [
      {
        question: 'How long does Azerbaijan e-visa take?',
        answer: 'Processing typically takes 3-5 working days. We recommend applying at least 1 week before your travel date to allow for any delays.'
      },
      {
        question: 'Can I extend my Azerbaijan e-visa?',
        answer: 'E-visas can be extended once for an additional 30 days by applying to the State Migration Service in Baku. Extensions must be applied for before your current visa expires.'
      },
      {
        question: 'What are the main attractions in Azerbaijan?',
        answer: 'Popular attractions include Baku\'s Old City, Flame Towers, Gobustan Rock Art, Mud Volcanoes, and the Caspian Sea coastline. The country offers a unique blend of ancient and modern.'
      },
      {
        question: 'Is Azerbaijan expensive to visit?',
        answer: 'Azerbaijan is relatively affordable compared to Western Europe. Accommodation, food, and transportation are reasonably priced, especially outside Baku.'
      }
    ]
  },
  {
    id: 'umrah-hajj',
    title: 'Umrah & Hajj Visa',
    description: 'Complete Umrah and Hajj visa packages with accommodation and guidance for your spiritual journey.',
    countries: 'Saudi Arabia - Religious Pilgrimage',
    image: '/assets/umrah-hajj.jpg',
    processingTime: '1-2 weeks',
    validity: '30-90 days',
    stayDuration: 'As per package',
    price: 'Package from £749',
    requirements: [
      'Valid passport (minimum 6 months validity)',
      'Recent passport photographs',
      'Completed visa application form',
      'Meningitis vaccination certificate (ACWY)',
      'Polio vaccination (if from certain countries)',
      'COVID-19 vaccination certificate',
      'Mahram requirement for women under 45 (Hajj)',
      'Proof of relationship (for family groups)',
      'Return flight tickets',
      'Accommodation booking confirmation'
    ],
    process: [
      {
        step: 1,
        title: 'Package Selection',
        description: 'Choose from our Umrah or Hajj packages based on your budget and preferences. We offer 3-star to 5-star options.'
      },
      {
        step: 2,
        title: 'Document Collection',
        description: 'Provide all required documents including passport, photographs, and vaccination certificates.'
      },
      {
        step: 3,
        title: 'Visa Application',
        description: 'We\'ll process your visa application through the Saudi Ministry of Hajj and Umrah portal.'
      },
      {
        step: 4,
        title: 'Vaccinations',
        description: 'Ensure you have all required vaccinations (Meningitis ACWY is mandatory). We can guide you to approved clinics.'
      },
      {
        step: 5,
        title: 'Travel Arrangements',
        description: 'We\'ll book your flights, hotels near Haram, and arrange airport transfers in Saudi Arabia.'
      },
      {
        step: 6,
        title: 'Pre-Departure Briefing',
        description: 'Attend our pre-departure session where we\'ll explain the rituals, provide guidance, and answer all questions.'
      },
      {
        step: 7,
        title: 'Departure & Support',
        description: 'Depart with your group. Our team will provide 24/7 support throughout your journey in Saudi Arabia.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Umrah and Hajj?',
        answer: 'Umrah is a voluntary pilgrimage that can be performed any time of year and takes 3-6 hours. Hajj is an obligatory pilgrimage performed during specific dates (8-13 Dhul Hijjah) and takes 5-6 days to complete.'
      },
      {
        question: 'What vaccinations are required?',
        answer: 'Meningitis ACWY vaccine is mandatory and must be taken at least 10 days before travel. COVID-19 vaccination is also required. Polio vaccine may be required for travelers from certain countries.'
      },
      {
        question: 'Can women travel alone for Umrah?',
        answer: 'Yes, women over 45 can travel for Umrah without a mahram (male guardian) if traveling in a group. Women under 45 must be accompanied by a mahram.'
      },
      {
        question: 'What is included in your Umrah packages?',
        answer: 'Our packages include: visa processing, return flights from London, hotel accommodation near Haram, airport transfers, Ziyarat tours, group leader support, and pre-departure guidance.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'We recommend booking at least 4-6 weeks in advance for Umrah. For Hajj, book as early as possible (6-12 months) as spaces are limited and allocated by quota.'
      },
      {
        question: 'What should I pack for Umrah?',
        answer: 'Essential items include: Ihram clothing (men), modest clothing (women), comfortable walking shoes, prayer mat, Quran, toiletries, medications, and copies of important documents. We provide a detailed packing list.'
      }
    ]
  }
];

export function getVisaById(id: string): Visa | undefined {
  return visas.find(visa => visa.id === id);
}
