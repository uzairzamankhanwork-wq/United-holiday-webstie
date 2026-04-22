import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  officeHours: string;
}

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
}

interface SiteSettings {
  contact: ContactInfo;
  social: SocialLinks;
  company: CompanyInfo;
}

export default function SiteSettingsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    contact: {
      phone: '+447418359679',
      email: 'info@unitedholidays.co.uk',
      address: 'London, United Kingdom',
      officeHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
    },
    social: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
    company: {
      name: 'United Holidays',
      tagline: 'Your Journey, Our Passion',
      description: 'Premium travel agency specializing in unforgettable experiences',
      whatsappNumber: '+447418359679',
    },
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await apiFetch('/admin/settings');
      const result = await response.json();
      if (result.success && result.settings) {
        setSettings(result.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await apiFetch('/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const result = await response.json();
      if (result.success) {
        alert('Site settings updated successfully!');
      } else {
        alert('Failed to update: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
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
        <h3 className="text-lg font-semibold">Site Settings</h3>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2" size={16} />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
        </TabsList>

        {/* Contact Info Tab */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  value={settings.contact.phone}
                  onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                  placeholder="+44 123 456 7890"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  value={settings.contact.email}
                  onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                  placeholder="info@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Office Address</label>
                <Textarea
                  value={settings.contact.address}
                  onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                  rows={2}
                  placeholder="123 Main Street, London, UK"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Office Hours</label>
                <Input
                  value={settings.contact.officeHours}
                  onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, officeHours: e.target.value } })}
                  placeholder="Mon-Fri: 9AM-6PM"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Facebook URL</label>
                <Input
                  value={settings.social.facebook}
                  onChange={(e) => setSettings({ ...settings, social: { ...settings.social, facebook: e.target.value } })}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Instagram URL</label>
                <Input
                  value={settings.social.instagram}
                  onChange={(e) => setSettings({ ...settings, social: { ...settings.social, instagram: e.target.value } })}
                  placeholder="https://instagram.com/yourpage"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Twitter URL</label>
                <Input
                  value={settings.social.twitter}
                  onChange={(e) => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })}
                  placeholder="https://twitter.com/yourpage"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">LinkedIn URL</label>
                <Input
                  value={settings.social.linkedin}
                  onChange={(e) => setSettings({ ...settings, social: { ...settings.social, linkedin: e.target.value } })}
                  placeholder="https://linkedin.com/company/yourpage"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">YouTube URL</label>
                <Input
                  value={settings.social.youtube}
                  onChange={(e) => setSettings({ ...settings, social: { ...settings.social, youtube: e.target.value } })}
                  placeholder="https://youtube.com/@yourpage"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Info Tab */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Company Name</label>
                <Input
                  value={settings.company.name}
                  onChange={(e) => setSettings({ ...settings, company: { ...settings.company, name: e.target.value } })}
                  placeholder="United Holidays"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tagline</label>
                <Input
                  value={settings.company.tagline}
                  onChange={(e) => setSettings({ ...settings, company: { ...settings.company, tagline: e.target.value } })}
                  placeholder="Your Journey, Our Passion"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Company Description</label>
                <Textarea
                  value={settings.company.description}
                  onChange={(e) => setSettings({ ...settings, company: { ...settings.company, description: e.target.value } })}
                  rows={3}
                  placeholder="Brief description of your company..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">WhatsApp Number</label>
                <Input
                  value={settings.company.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, company: { ...settings.company, whatsappNumber: e.target.value } })}
                  placeholder="+44 123 456 7890"
                />
                <p className="text-xs text-muted-foreground mt-1">Used for WhatsApp buttons throughout the site</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2">Site Settings Manager</p>
        <p>Update your contact information, social media links, and company details. These settings are used throughout your website!</p>
      </div>
    </div>
  );
}
