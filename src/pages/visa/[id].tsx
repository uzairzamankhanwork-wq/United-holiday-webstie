import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Clock, Calendar, DollarSign, CheckCircle, ChevronLeft, FileText, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { apiFetch } from '@/lib/api';

interface Visa {
  id: number;
  visaId: string;
  title: string;
  description: string;
  countries: string;
  processingTime: string;
  validity: string;
  stayDuration: string;
  price: string;
  image: string;
  requiredDocuments: string[];
  applicationProcess: Array<{ step: number; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export default function VisaDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [visa, setVisa] = useState<Visa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVisa = async () => {
      try {
        const response = await apiFetch('/visas');
        const data = await response.json();
        
        if (data.success) {
          const found = data.visas.find((v: Visa) => v.visaId === id);
          if (found) {
            // Ensure all arrays are never null
            setVisa({
              ...found,
              requiredDocuments: found.requiredDocuments || [],
              applicationProcess: found.applicationProcess || [],
              faqs: found.faqs || [],
            });
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching visa:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVisa();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error || !visa) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <title>{visa.title} | United Holidays - Visa Services</title>
      <meta
        name="description"
        content={`${visa.description} Expert visa assistance from United Holidays.`}
      />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${visa.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <Link to="/" className="mb-4 inline-flex items-center text-white hover:text-white/80 transition-colors w-fit">
            <ChevronLeft size={20} />
            <span className="ml-1">Back to Home</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{visa.title}</h1>
            <p className="text-xl text-white/90 max-w-3xl">{visa.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Visa Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Clock className="text-primary mt-1" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Processing Time</p>
                      <p className="font-semibold">{visa.processingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Calendar className="text-primary mt-1" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Validity</p>
                      <p className="font-semibold">{visa.validity}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Clock className="text-primary mt-1" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Stay Duration</p>
                      <p className="font-semibold">{visa.stayDuration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <DollarSign className="text-primary mt-1" size={24} />
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-semibold">{visa.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Countries Covered */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Countries Covered</h2>
                <p className="text-muted-foreground leading-relaxed">{visa.countries}</p>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Required Documents</h2>
                <div className="space-y-3">
                  {visa.requiredDocuments.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Application Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Application Process</h2>
                <div className="space-y-6">
                  {visa.applicationProcess.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {visa.faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card border border-border rounded-lg p-6 sticky top-24"
              >
                <div className="text-center mb-6">
                  <FileText className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Need Assistance?</h3>
                  <p className="text-muted-foreground">
                    Our visa experts are here to help you with your application
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <a href="tel:+447418359679" className="block">
                    <Button size="lg" className="w-full text-base py-6 touch-manipulation">
                      <Phone className="mr-2" size={20} />
                      Call Us Now
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/447418359679?text=Hi, I need help with ${visa.title}. Can you assist me?`}
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
                  <h4 className="font-bold mb-3">Why Choose Us?</h4>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">Expert visa consultants</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">High approval rate</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">Complete documentation support</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">Fast processing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm">24/7 customer support</span>
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
