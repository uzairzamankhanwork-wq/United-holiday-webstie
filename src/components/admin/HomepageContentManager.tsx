import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';

interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaWhatsappText: string;
}

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TrustPoint {
  title: string;
  description: string;
}

interface HomepageData {
  hero: HeroContent;
  testimonials: Testimonial[];
  faqs: FAQ[];
  trustPoints: TrustPoint[];
}

export default function HomepageContentManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<HomepageData>({
    hero: {
      title: 'Discover Your Dream Destination',
      subtitle: 'Premium travel packages to the world\'s most beautiful destinations',
      ctaText: 'Call Now',
      ctaWhatsappText: 'WhatsApp Now',
    },
    testimonials: [],
    faqs: [],
    trustPoints: [],
  });

  useEffect(() => {
    fetchHomepageContent();
  }, []);

  const fetchHomepageContent = async () => {
    try {
      const response = await fetch('/api/admin/homepage');
      const result = await response.json();
      if (result.success && result.content) {
        setData(result.content);
      }
    } catch (error) {
      console.error('Error fetching homepage content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        alert('Homepage content updated successfully!');
      } else {
        alert('Failed to update: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving homepage content:', error);
      alert('Failed to save homepage content');
    } finally {
      setSaving(false);
    }
  };

  // Testimonials management
  const addTestimonial = () => {
    setData({
      ...data,
      testimonials: [...data.testimonials, { name: '', location: '', rating: 5, text: '' }],
    });
  };

  const updateTestimonial = (index: number, field: keyof Testimonial, value: string | number) => {
    const newTestimonials = [...data.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setData({ ...data, testimonials: newTestimonials });
  };

  const removeTestimonial = (index: number) => {
    setData({
      ...data,
      testimonials: data.testimonials.filter((_, i) => i !== index),
    });
  };

  // FAQs management
  const addFaq = () => {
    setData({
      ...data,
      faqs: [...data.faqs, { question: '', answer: '' }],
    });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...data.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setData({ ...data, faqs: newFaqs });
  };

  const removeFaq = (index: number) => {
    setData({
      ...data,
      faqs: data.faqs.filter((_, i) => i !== index),
    });
  };

  // Trust Points management
  const addTrustPoint = () => {
    setData({
      ...data,
      trustPoints: [...data.trustPoints, { title: '', description: '' }],
    });
  };

  const updateTrustPoint = (index: number, field: 'title' | 'description', value: string) => {
    const newTrustPoints = [...data.trustPoints];
    newTrustPoints[index] = { ...newTrustPoints[index], [field]: value };
    setData({ ...data, trustPoints: newTrustPoints });
  };

  const removeTrustPoint = (index: number) => {
    setData({
      ...data,
      trustPoints: data.trustPoints.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Homepage Content</h3>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2" size={16} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="trust">Trust Points</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Main Title</label>
                <Input
                  value={data.hero.title}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                  placeholder="e.g., Discover Your Dream Destination"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subtitle</label>
                <Textarea
                  value={data.hero.subtitle}
                  onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                  rows={2}
                  placeholder="e.g., Premium travel packages to the world's most beautiful destinations"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Call Button Text</label>
                  <Input
                    value={data.hero.ctaText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaText: e.target.value } })}
                    placeholder="e.g., Call Now"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">WhatsApp Button Text</label>
                  <Input
                    value={data.hero.ctaWhatsappText}
                    onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaWhatsappText: e.target.value } })}
                    placeholder="e.g., WhatsApp Now"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Customer Testimonials</h4>
            <Button onClick={addTestimonial} size="sm">
              <Plus className="mr-2" size={16} />
              Add Testimonial
            </Button>
          </div>
          {data.testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Testimonial {index + 1}</CardTitle>
                  <Button onClick={() => removeTestimonial(index)} variant="destructive" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Customer Name</label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                      placeholder="e.g., Sarah Johnson"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      value={testimonial.location}
                      onChange={(e) => updateTestimonial(index, 'location', e.target.value)}
                      placeholder="e.g., London, UK"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Rating (1-5)</label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Review Text</label>
                  <Textarea
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                    rows={3}
                    placeholder="Customer's review..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {data.testimonials.length === 0 && (
            <p className="text-sm text-muted-foreground">No testimonials added yet. Click "Add Testimonial" to start.</p>
          )}
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Frequently Asked Questions</h4>
            <Button onClick={addFaq} size="sm">
              <Plus className="mr-2" size={16} />
              Add FAQ
            </Button>
          </div>
          {data.faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">FAQ {index + 1}</CardTitle>
                  <Button onClick={() => removeFaq(index)} variant="destructive" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Question</label>
                  <Input
                    value={faq.question}
                    onChange={(e) => updateFaq(index, 'question', e.target.value)}
                    placeholder="e.g., What payment methods do you accept?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Answer</label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                    rows={3}
                    placeholder="Provide the answer..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {data.faqs.length === 0 && (
            <p className="text-sm text-muted-foreground">No FAQs added yet. Click "Add FAQ" to start.</p>
          )}
        </TabsContent>

        {/* Trust Points Tab */}
        <TabsContent value="trust" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Why Choose Us - Trust Points</h4>
            <Button onClick={addTrustPoint} size="sm">
              <Plus className="mr-2" size={16} />
              Add Trust Point
            </Button>
          </div>
          {data.trustPoints.map((point, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Trust Point {index + 1}</CardTitle>
                  <Button onClick={() => removeTrustPoint(index)} variant="destructive" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={point.title}
                    onChange={(e) => updateTrustPoint(index, 'title', e.target.value)}
                    placeholder="e.g., Expert Travel Advisors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={point.description}
                    onChange={(e) => updateTrustPoint(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Brief description..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {data.trustPoints.length === 0 && (
            <p className="text-sm text-muted-foreground">No trust points added yet. Click "Add Trust Point" to start.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2">Homepage Content Manager</p>
        <p>Edit your homepage hero section, customer testimonials, FAQs, and trust points. All changes are saved to the database!</p>
      </div>
    </div>
  );
}
