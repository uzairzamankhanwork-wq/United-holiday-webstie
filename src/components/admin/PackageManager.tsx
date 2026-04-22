import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Loader2, Plus, Trash2 } from 'lucide-react';
import DetailedPackageEditor, { type PackageData } from './DetailedPackageEditor';

export default function PackageManager() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch packages from API
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/packages');
      const data = await response.json();
      if (data.success) {
        setPackages(data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      alert('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: PackageData) => {
    setEditingId(pkg.id);
    setCreating(false);
  };

  const handleCreateNew = () => {
    setCreating(true);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setCreating(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setPackages(packages.filter(pkg => pkg.id !== id));
        alert('Package deleted successfully!');
      } else {
        alert('Failed to delete package: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };

  const handleSave = async (editData: PackageData) => {
    setSaving(true);
    try {
      const isCreating = !editData.id || editData.id === 0;
      const url = isCreating ? '/api/admin/packages' : `/api/admin/packages/${editData.id}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await response.json();
      if (data.success) {
        if (isCreating) {
          // Refresh the list to get the new package
          await fetchPackages();
          alert('Package created successfully!');
        } else {
          // Update local state
          setPackages(packages.map(pkg => 
            pkg.id === editData.id ? data.package : pkg
          ));
          alert('Package updated successfully!');
        }
        setEditingId(null);
        setCreating(false);
      } else {
        alert(`Failed to ${isCreating ? 'create' : 'update'} package: ` + data.error);
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package');
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

  const editingPackage = packages.find(pkg => pkg.id === editingId);

  if (editingPackage || creating) {
    const packageData = creating ? {
      id: 0,
      packageId: '',
      name: '',
      location: '',
      price: 0,
      rating: '5.0',
      duration: '',
      groupSize: '',
      description: '',
      image: '',
      highlights: [],
      itinerary: [],
      included: [],
      notIncluded: [],
    } as PackageData : editingPackage!;

    return (
      <DetailedPackageEditor
        package={packageData}
        onSave={handleSave}
        onCancel={handleCancel}
        saving={saving}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Travel Packages</h2>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus size={18} />
          Create New Package
        </Button>
      </div>

      {packages.map((pkg) => (
        <Card key={pkg.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{pkg.location}</p>
                <p className="text-lg font-bold text-primary mt-2">£{pkg.price}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(pkg)}>
                  <Edit className="mr-2" size={16} />
                  Edit Full Details
                </Button>
                <Button 
                  onClick={() => handleDelete(pkg.id, pkg.name)} 
                  variant="outline" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Location:</span> {pkg.location}
              </div>
              <div>
                <span className="font-medium">Price:</span> £{pkg.price}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {pkg.duration}
              </div>
              <div>
                <span className="font-medium">Group Size:</span> {pkg.groupSize}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Highlights:</span> {(pkg.highlights || []).length} items
              </div>
              <div className="col-span-2">
                <span className="font-medium">Itinerary:</span> {(pkg.itinerary || []).length} days
              </div>
              <div className="col-span-2">
                <span className="font-medium">Description:</span> {pkg.description}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
        <p className="font-semibold mb-2">Full Content Management Enabled</p>
        <p>You can now edit all package details including highlights, day-by-day itineraries, and inclusions/exclusions. All changes are saved to the database permanently!</p>
      </div>
    </div>
  );
}
