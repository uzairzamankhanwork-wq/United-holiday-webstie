import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Calendar, Users, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';

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

/**
 * Destinations Page
 * Comprehensive catalog of travel destinations with packages
 */
export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await apiFetch('/packages');
        const data = await response.json();
        
        if (data.success) {
          // Ensure all arrays are never null
          const packagesWithArrays = data.packages.map((pkg: any) => ({
            ...pkg,
            highlights: pkg.highlights || [],
          }));
          setDestinations(packagesWithArrays);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }
  return (
    <>
      {/* SEO Meta Tags */}
      <title>Travel Destinations | United Holidays - UK Travel Agency</title>
      <meta
        name="description"
        content="Explore our handpicked travel destinations worldwide. From tropical Maldives to spiritual Makkah, find your perfect holiday package with United Holidays."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Handpicked destinations around the world with exclusive packages tailored for UK travelers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold shadow-lg">
                      From £{destination.price}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/95 px-3 py-1.5 rounded-full">
                      <Star className="text-secondary fill-secondary" size={16} />
                      <span className="font-semibold text-sm">{destination.rating}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-2xl">{destination.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <CardDescription>{destination.location}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-muted-foreground mb-6">{destination.description}</p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                        Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {destination.highlights.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Package Info */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{destination.groupSize}</span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="mt-auto space-y-3">
                      <Link to={`/destination/${destination.packageId}`} className="block">
                        <Button variant="outline" className="w-full">
                          View Full Details
                        </Button>
                      </Link>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="tel:+447418359679" className="flex-1">
                          <Button className="w-full">
                            <Phone className="mr-2" size={18} />
                            Call
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/447418359679?text=Hi, I'm interested in the ${destination.name} package (£${destination.price}). Can you provide more details?`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
                            <MessageCircle className="mr-2" size={18} />
                            WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find Your Dream Destination?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We offer packages to destinations worldwide. Contact our travel experts to create a custom itinerary just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+447418359679">
                <Button size="lg" className="w-full sm:w-auto">
                  <Phone className="mr-2" size={18} />
                  Call Us Now
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
    </>
  );
}
