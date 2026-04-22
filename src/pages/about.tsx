import { motion } from 'motion/react';
import { Shield, Award, Users, Clock, Heart, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

/**
 * About Page
 * Company story, values, and team information
 */
export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'ATOL protected and fully licensed UK travel agency with complete financial protection for your bookings.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Award-winning service with a commitment to delivering exceptional travel experiences every time.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to ensure your journey is perfect.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service team ready to assist you before, during, and after your trip.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access to destinations worldwide with partnerships across the globe for the best rates.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced travel consultants with extensive knowledge and passion for creating dream holidays.',
    },
  ];

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Destinations' },
    { number: '24/7', label: 'Customer Support' },
  ];

  const services = [
    'Flight Bookings - Worldwide',
    'Luxury Hotel Reservations',
    'Umrah & Hajj Packages',
    'Visa Assistance Services',
    'Group Travel Planning',
    'Honeymoon Packages',
    'Business Class Upgrades',
    'Travel Insurance',
    'Airport Transfers',
    'Custom Itineraries',
    'Cruise Bookings',
    'Ski Holiday Packages',
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>About Us | United Holidays - UK Travel Agency</title>
      <meta
        name="description"
        content="Learn about United Holidays, your trusted UK travel agency. Over 10 years of experience creating unforgettable journeys worldwide with ATOL protection."
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
              Your Trusted Travel Partner
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90">
              Creating unforgettable journeys for UK travelers since 2015
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' as const }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground text-left">
                <p>
                  Founded in 2015, United Holidays began with a simple mission: to make world-class travel accessible and affordable for everyone in the UK. What started as a small travel agency in London has grown into a trusted name serving thousands of satisfied customers across the United Kingdom.
                </p>
                <p>
                  Our journey has been driven by passion, dedication, and an unwavering commitment to customer satisfaction. We understand that travel is more than just reaching a destination—it's about creating memories, experiencing new cultures, and enriching lives.
                </p>
                <p>
                  Today, we're proud to offer comprehensive travel services including flights, hotels, holiday packages, visa assistance, and specialized religious travel packages for Umrah and Hajj. Our team of experienced travel consultants works tirelessly to ensure every journey is seamless, affordable, and unforgettable.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive travel services tailored to your needs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' as const }}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span className="font-medium">{service}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose United Holidays?
            </h2>
            <div className="space-y-4 text-lg text-primary-foreground/90">
              <p>
                <strong>ATOL Protected:</strong> Your financial protection is guaranteed with our ATOL certification, giving you complete peace of mind.
              </p>
              <p>
                <strong>Best Price Guarantee:</strong> We work with trusted partners worldwide to bring you the most competitive rates on flights, hotels, and packages.
              </p>
              <p>
                <strong>Personalized Service:</strong> Every traveler is unique. We take time to understand your preferences and create tailored experiences just for you.
              </p>
              <p>
                <strong>Expert Knowledge:</strong> Our team has firsthand experience with destinations worldwide and stays updated on travel requirements, visa regulations, and local insights.
              </p>
            </div>
          </motion.div>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Let our expert team help you plan your next unforgettable adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+447418359679">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg w-full sm:w-auto">
                  Call Us Now
                </button>
              </a>
              <a href="https://wa.me/447418359679" target="_blank" rel="noopener noreferrer">
                <button className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg w-full sm:w-auto">
                  WhatsApp Us
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
