import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Plane, Shield, Clock, Award, Star, Users, FileText, CheckCircle, Loader2, Hotel, Globe, Briefcase, Snowflake, Waves, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';

interface Destination {
  id: number;
  packageId: string;
  name: string;
  location: string;
  price: number;
  rating: string;
  duration: string;
  groupSize: string;
  description: string;
  image: string;
  highlights: string[];
}

interface Visa {
  id: number;
  visaId: string;
  title: string;
  description: string;
  countries: string;
  image: string;
}

/**
 * United Holidays Homepage
 * Premium travel agency website with conversion-focused design
 */
export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [visas, setVisas] = useState<Visa[]>([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [loadingVisas, setLoadingVisas] = useState(true);
  
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        
        if (data.success) {
          // Show only first 6 destinations on homepage
          const packagesWithArrays = data.packages.map((pkg: any) => ({
            ...pkg,
            highlights: pkg.highlights || [],
          }));
          setDestinations(packagesWithArrays.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoadingDestinations(false);
      }
    };

    const fetchVisas = async () => {
      try {
        const response = await fetch('/api/visas');
        const data = await response.json();
        
        if (data.success) {
          setVisas(data.visas);
        }
      } catch (error) {
        console.error('Error fetching visas:', error);
      } finally {
        setLoadingVisas(false);
      }
    };

    fetchDestinations();
    fetchVisas();
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    travelDate: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.destination || !formData.travelDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Send to backend API (optional - for logging/email notifications)
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('Failed to send to backend:', error);
      // Continue anyway - WhatsApp is primary method
    }

    // Create WhatsApp message
    const message = `*New Quote Request from United Holidays Website*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Destination:* ${formData.destination}
*Travel Date:* ${formData.travelDate}
*Message:* ${formData.message || 'No additional message'}

Please contact this customer as soon as possible.`;

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/447418359679?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');

    // Show success message
    alert('Thank you! Your quote request has been sent. We will contact you shortly.');

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      destination: '',
      travelDate: '',
      message: '',
    });
  };

  const features = [
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Competitive rates on flights, hotels, and packages',
    },
    {
      icon: Shield,
      title: 'Trusted UK Agency',
      description: 'ATOL protected and fully licensed travel agency',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for your peace of mind',
    },
    {
      icon: Award,
      title: 'Custom Packages',
      description: 'Tailored holidays designed around your preferences',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced travel consultants at your service',
    },
    {
      icon: Plane,
      title: 'Worldwide Travel',
      description: 'Access to destinations across the globe',
    },
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>United Holidays - UK Travel Agency | Flights, Hotels & Holiday Packages</title>
      <meta
        name="description"
        content="Explore the world with United Holidays. Affordable flights, luxury hotels, and custom holiday packages. Book your dream vacation today!"
      />

      {/* Hero Section */}
      <section className="relative min-h-[500px] h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/airo-assets/images/pages/home/hero')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Explore the World with United Holidays
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' as const }}
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-white/90 px-4"
          >
            Discover affordable holiday packages, flights, and luxury hotels worldwide. Your dream vacation starts here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' as const }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <a href="tel:+447418359679" className="w-full sm:w-auto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full min-h-[56px] touch-manipulation">
                <Phone className="mr-2" size={20} />
                Call Now
              </Button>
            </a>
            <a href="https://wa.me/447418359679" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 w-full min-h-[56px] touch-manipulation">
                <MessageCircle className="mr-2" size={20} />
                WhatsApp Now
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-secondary text-secondary-foreground py-4 overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex gap-8 items-center whitespace-nowrap">
          {/* First set */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <Plane size={18} /> Flights Worldwide
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Hotel size={18} /> Luxury Hotels
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Star size={18} /> Umrah Packages
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Globe size={18} /> Group Travel
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Briefcase size={18} /> Business Class
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Snowflake size={18} /> Ski Holidays
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Waves size={18} /> Beach Resorts
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Heart size={18} /> Honeymoon Packages
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          
          {/* Duplicate for seamless loop */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <Plane size={18} /> Flights Worldwide
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Hotel size={18} /> Luxury Hotels
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Star size={18} /> Umrah Packages
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Globe size={18} /> Group Travel
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Briefcase size={18} /> Business Class
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Snowflake size={18} /> Ski Holidays
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Waves size={18} /> Beach Resorts
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
          <div className="flex items-center gap-2 text-sm font-medium">
            <Heart size={18} /> Honeymoon Packages
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-foreground/40" />
        </div>
      </div>

      {/* Popular Destinations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our most sought-after travel destinations around the world
            </p>
          </motion.div>

          {loadingDestinations ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <Link key={destination.id} to={`/destination/${destination.packageId}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                      <Button variant="secondary" size="sm" className="group-hover:bg-secondary/90">
                        View Packages
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visa Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visa Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional visa assistance for your international travel needs
            </p>
          </motion.div>

          {loadingVisas ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visas.map((visa, index) => (
                <motion.div
                  key={visa.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 group"
                >
                  {/* Country Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={visa.image}
                      alt={visa.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 w-10 h-10 bg-white/95 rounded-lg flex items-center justify-center">
                      <FileText className="text-primary" size={20} />
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{visa.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{visa.description}</p>
                    <div className="flex items-start gap-2 mb-4">
                      <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={16} />
                      <p className="text-xs text-muted-foreground">{visa.countries}</p>
                    </div>
                    <Link to={`/visa/${visa.visaId}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' as const }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-6">
              Need help with your visa application? Our expert team is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+447418359679">
                <Button size="lg" className="w-full sm:w-auto">
                  <Phone className="mr-2" size={18} />
                  Call for Visa Consultation
                </Button>
              </a>
              <a href="https://wa.me/447418359679" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white w-full sm:w-auto">
                  <MessageCircle className="mr-2" size={18} />
                  WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose United Holidays?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your trusted partner for unforgettable travel experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
                className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Free Quote</h2>
              <p className="text-muted-foreground text-lg">
                Tell us about your dream holiday and we'll create a personalized package for you
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full min-h-[48px] text-base"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07123 456789"
                    className="w-full min-h-[48px] text-base"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full min-h-[48px] text-base"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium mb-2">
                    Destination *
                  </label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => setFormData({ ...formData, destination: value })}
                  >
                    <SelectTrigger id="destination" className="w-full min-h-[48px] text-base">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maldives">Maldives</SelectItem>
                      <SelectItem value="switzerland">Switzerland</SelectItem>
                      <SelectItem value="makkah">Makkah</SelectItem>
                      <SelectItem value="madinah">Madinah</SelectItem>
                      <SelectItem value="newyork">New York</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="travelDate" className="block text-sm font-medium mb-2">
                  Travel Date *
                </label>
                <Input
                  id="travelDate"
                  type="date"
                  required
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full min-h-[48px] text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your travel preferences, number of travelers, budget, etc."
                  rows={4}
                  className="w-full min-h-[120px] text-base"
                />
              </div>

              <Button type="submit" size="lg" className="w-full text-base sm:text-lg py-5 sm:py-6 min-h-[56px] touch-manipulation">
                Get a Free Quote
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real experiences from travelers who trusted us with their journeys
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Ahmed',
                location: 'London, UK',
                rating: 5,
                text: 'United Holidays made our Umrah journey absolutely seamless. From visa processing to hotel bookings near Haram, everything was perfect. Highly recommended!',
                destination: 'Makkah & Madinah',
              },
              {
                name: 'James Wilson',
                location: 'Manchester, UK',
                rating: 5,
                text: 'Best travel agency we\'ve worked with! They found us an amazing honeymoon package to Maldives at an unbeatable price. The service was exceptional throughout.',
                destination: 'Maldives',
              },
              {
                name: 'Fatima Khan',
                location: 'Birmingham, UK',
                rating: 5,
                text: 'Professional visa assistance for our family trip to Switzerland. They handled everything efficiently and we got our visas without any hassle. Thank you!',
                destination: 'Switzerland',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-secondary fill-secondary" size={20} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-sm text-primary mt-1">Traveled to: {testimonial.destination}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Quick answers to common questions about booking with United Holidays
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'How do I book a holiday package?',
                answer: 'Simply call us, WhatsApp, or fill out the quote form. Our travel experts will create a personalized package based on your preferences and budget.',
              },
              {
                question: 'Are my bookings protected?',
                answer: 'Yes! All our packages are ATOL protected, giving you complete financial protection and peace of mind for your bookings.',
              },
              {
                question: 'Do you offer payment plans?',
                answer: 'Absolutely! We offer flexible payment plans for most packages. Contact us to discuss options that work for your budget.',
              },
              {
                question: 'How long does visa processing take?',
                answer: 'Processing times vary by country. Schengen visas typically take 15-20 days, UK visas 3-4 weeks. We guide you through the entire process.',
              },
              {
                question: 'Can I customize my package?',
                answer: 'Yes! We specialize in creating custom itineraries. Tell us your preferences and we\'ll design a package tailored just for you.',
              },
              {
                question: 'What if I need to cancel?',
                answer: 'Cancellation policies vary by booking. We\'ll explain all terms before you book and help you with travel insurance options for added protection.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' as const }}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Exclusive Travel Deals
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Subscribe to our newsletter for special offers, travel tips, and early access to amazing deals
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white text-foreground"
                required
              />
              <Button type="submit" size="lg" variant="secondary" className="sm:w-auto">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-primary-foreground/70 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wide font-semibold">
              Trusted & Secure
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center gap-3">
                <Shield className="text-primary" size={32} />
                <div className="text-left">
                  <p className="font-bold text-lg">Secure Payments</p>
                  <p className="text-sm text-muted-foreground">SSL Encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-primary" size={32} />
                <div className="text-left">
                  <p className="font-bold text-lg">Trusted Agency</p>
                  <p className="text-sm text-muted-foreground">10+ Years Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={32} />
                <div className="text-left">
                  <p className="font-bold text-lg">Best Price Guarantee</p>
                  <p className="text-sm text-muted-foreground">Competitive Rates</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/447418359679"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation min-w-[56px] min-h-[56px] flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
      </a>
    </>
  );
}
