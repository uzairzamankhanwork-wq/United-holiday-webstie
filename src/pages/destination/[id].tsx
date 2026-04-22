import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, MapPin, Clock, Users, Star, Check, X, ChevronLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

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
  itinerary: Array<{ day: number; title: string; description: string }>;
  included: string[];
  notIncluded: string[];
}

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch('/api/packages');
        const data = await response.json();
        
        if (data.success) {
          const found = data.packages.find((pkg: Destination) => pkg.packageId === id);
          if (found) {
            // Ensure all arrays are never null
            setDestination({
              ...found,
              highlights: found.highlights || [],
              itinerary: found.itinerary || [],
              included: found.included || [],
              notIncluded: found.notIncluded || [],
            });
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching destination:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error || !destination) {
    return <Navigate to="/destinations" replace />;
  }

  return (
    <>
      <title>{destination.name} Holiday Package | United Holidays</title>
      <meta
        name="description"
        content={`Book your ${destination.name} holiday package from £${destination.price}. ${destination.description}`}
      />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${destination.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <Link to="/destinations" className="mb-4 inline-flex items-center text-white hover:text-white/80 transition-colors w-fit">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Destinations</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{destination.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <span>{destination.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-secondary text-secondary" />
                <span>{destination.rating} Rating</span>
              </div>
              <div className="text-2xl font-bold">
                From £{destination.price}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {destination.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Clock className="text-primary" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Users className="text-primary" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-semibold">{destination.groupSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Star className="text-primary" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Rating</p>
                      <p className="font-semibold">{destination.rating}/5.0</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="text-primary flex-shrink-0" size={20} />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4">What's Included</h2>
                <div className="space-y-2">
                  {destination.included.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={18} />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What's Not Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
                <div className="space-y-2">
                  {destination.notIncluded.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <X className="text-red-500 flex-shrink-0 mt-1" size={18} />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Itinerary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-6">
                  {destination.itinerary.map((day, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{day.title}</h3>
                        <p className="text-muted-foreground">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                  <p className="text-4xl font-bold text-primary">£{destination.price}</p>
                  <p className="text-sm text-muted-foreground">per person</p>
                </div>

                <div className="space-y-3 mb-6">
                  <a href="tel:+447418359679" className="block">
                    <Button size="lg" className="w-full text-base py-6 touch-manipulation">
                      <Phone className="mr-2" size={20} />
                      Call to Book
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/447418359679?text=Hi, I'm interested in the ${destination.name} package (£${destination.price}). Can you provide more details?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-base py-6 touch-manipulation"
                    >
                      <MessageCircle className="mr-2" size={20} />
                      WhatsApp Us
                    </Button>
                  </a>
                </div>

                <div className="border-t border-border pt-6 space-y-3">
                  <h3 className="font-bold mb-3">Why Book With Us?</h3>
                  <div className="flex items-start gap-2">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">Best price guarantee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">Flexible payment plans</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">24/7 customer support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">Trusted UK agency</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
