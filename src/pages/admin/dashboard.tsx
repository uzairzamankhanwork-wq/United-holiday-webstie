import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, FileText, Database, Loader2, Home, Settings } from 'lucide-react';
import PackageManager from '@/components/admin/PackageManager';
import VisaManager from '@/components/admin/VisaManager';
import HomepageContentManager from '@/components/admin/HomepageContentManager';
import SiteSettingsManager from '@/components/admin/SiteSettingsManager';
import { apiFetch } from '@/lib/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const adminUser = localStorage.getItem('adminUser');
  const [seeding, setSeeding] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleSeedDatabase = async () => {
    if (!confirm('This will populate the database with initial data. Continue?')) {
      return;
    }

    setSeeding(true);
    try {
      const response = await apiFetch('/admin/seed', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        alert(`Database seeded successfully!\nPackages: ${data.packagesCount}\nVisas: ${data.visasCount}`);
        window.location.reload(); // Reload to show new data
      } else {
        alert('Failed to seed database: ' + data.error);
      }
    } catch (error) {
      console.error('Error seeding database:', error);
      alert('Failed to seed database');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <title>Admin Dashboard | United Holidays</title>
      <meta name="robots" content="noindex, nofollow" />

      <div className="min-h-screen bg-muted/30">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">United Holidays Admin</h1>
                <p className="text-sm text-muted-foreground">Welcome, {adminUser}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSeedDatabase} variant="outline" disabled={seeding}>
                  {seeding ? <Loader2 className="mr-2 animate-spin" size={18} /> : <Database className="mr-2" size={18} />}
                  Seed Database
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  <LogOut className="mr-2" size={18} />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Seed Database Button */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2" size={20} />
                Database Setup
              </CardTitle>
              <CardDescription>
                First time setup: Click below to populate the database with initial packages and visas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleSeedDatabase} disabled={seeding}>
                {seeding ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Seeding Database...
                  </>
                ) : (
                  <>
                    <Database className="mr-2" size={18} />
                    Seed Database
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Tabs defaultValue="packages" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="packages">
                <Package className="mr-2" size={18} />
                Packages
              </TabsTrigger>
              <TabsTrigger value="visas">
                <FileText className="mr-2" size={18} />
                Visas
              </TabsTrigger>
              <TabsTrigger value="homepage">
                <Home className="mr-2" size={18} />
                Homepage
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2" size={18} />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="packages">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Travel Packages</CardTitle>
                  <CardDescription>
                    Edit package details, itineraries, highlights, and inclusions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PackageManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visas">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Visa Services</CardTitle>
                  <CardDescription>
                    Edit visa information, documents, application process, and FAQs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VisaManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="homepage">
              <Card>
                <CardHeader>
                  <CardTitle>Homepage Content</CardTitle>
                  <CardDescription>
                    Edit hero section, testimonials, FAQs, and trust points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <HomepageContentManager />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>
                    Manage contact information, social media links, and company details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SiteSettingsManager />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
