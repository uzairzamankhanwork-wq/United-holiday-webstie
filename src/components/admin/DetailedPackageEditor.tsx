import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, X } from 'lucide-react';
import ImageUploader from './ImageUploader';

export interface PackageData {
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
  highlights?: string[];
  itinerary?: Array<{ day: number; title: string; description: string }>;
  included?: string[];
  notIncluded?: string[];
}

interface Props {
  package: PackageData;
  onSave: (data: PackageData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export default function DetailedPackageEditor({ package: pkg, onSave, onCancel, saving }: Props) {
  const [editData, setEditData] = useState<PackageData>({ ...pkg });

  // Highlights management
  const addHighlight = () => {
    setEditData({
      ...editData,
      highlights: [...(editData.highlights || []), ''],
    });
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...(editData.highlights || [])];
    newHighlights[index] = value;
    setEditData({ ...editData, highlights: newHighlights });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = (editData.highlights || []).filter((_, i) => i !== index);
    setEditData({ ...editData, highlights: newHighlights });
  };

  // Itinerary management
  const addItineraryDay = () => {
    const nextDay = (editData.itinerary || []).length + 1;
    setEditData({
      ...editData,
      itinerary: [...(editData.itinerary || []), { day: nextDay, title: '', description: '' }],
    });
  };

  const updateItinerary = (index: number, field: 'title' | 'description', value: string) => {
    const newItinerary = [...(editData.itinerary || [])];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setEditData({ ...editData, itinerary: newItinerary });
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = (editData.itinerary || [])
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, day: i + 1 }));
    setEditData({ ...editData, itinerary: newItinerary });
  };

  // Included/Not Included management
  const addIncluded = () => {
    setEditData({
      ...editData,
      included: [...(editData.included || []), ''],
    });
  };

  const updateIncluded = (index: number, value: string) => {
    const newIncluded = [...(editData.included || [])];
    newIncluded[index] = value;
    setEditData({ ...editData, included: newIncluded });
  };

  const removeIncluded = (index: number) => {
    const newIncluded = (editData.included || []).filter((_, i) => i !== index);
    setEditData({ ...editData, included: newIncluded });
  };

  const addNotIncluded = () => {
    setEditData({
      ...editData,
      notIncluded: [...(editData.notIncluded || []), ''],
    });
  };

  const updateNotIncluded = (index: number, value: string) => {
    const newNotIncluded = [...(editData.notIncluded || [])];
    newNotIncluded[index] = value;
    setEditData({ ...editData, notIncluded: newNotIncluded });
  };

  const removeNotIncluded = (index: number) => {
    const newNotIncluded = (editData.notIncluded || []).filter((_, i) => i !== index);
    setEditData({ ...editData, notIncluded: newNotIncluded });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Editing: {pkg.name}</h3>
        <div className="flex gap-2">
          <Button onClick={() => onSave(editData)} disabled={saving}>
            <Save className="mr-2" size={16} />
            {saving ? 'Saving...' : 'Save All Changes'}
          </Button>
          <Button onClick={onCancel} variant="outline" disabled={saving}>
            <X className="mr-2" size={16} />
            Cancel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Package Name</label>
              <Input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Price (£)</label>
              <Input
                type="number"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Duration</label>
              <Input
                value={editData.duration}
                onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                placeholder="e.g., 7 Days / 6 Nights"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Group Size</label>
              <Input
                value={editData.groupSize}
                onChange={(e) => setEditData({ ...editData, groupSize: e.target.value })}
                placeholder="e.g., 2-10 People"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Package ID (Slug)</label>
              <Input
                value={editData.packageId}
                onChange={(e) => setEditData({ ...editData, packageId: e.target.value })}
                placeholder="e.g., maldives-luxury"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Package Image</label>
            <ImageUploader
              currentImage={editData.image}
              onImageUploaded={(url) => setEditData({ ...editData, image: url })}
              folder="packages"
              label="Upload Package Image"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Or enter image URL manually:
            </p>
            <Input
              value={editData.image}
              onChange={(e) => setEditData({ ...editData, image: e.target.value })}
              placeholder="/airo-assets/images/... or https://..."
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={4}
            />
          </div>
        </TabsContent>

        {/* Highlights Tab */}
        <TabsContent value="highlights" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Package Highlights</h4>
            <Button onClick={addHighlight} size="sm">
              <Plus className="mr-2" size={16} />
              Add Highlight
            </Button>
          </div>
          {(editData.highlights || []).map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => updateHighlight(index, e.target.value)}
                placeholder="Enter highlight"
              />
              <Button onClick={() => removeHighlight(index)} variant="destructive" size="icon">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          {(editData.highlights || []).length === 0 && (
            <p className="text-sm text-muted-foreground">No highlights added yet. Click "Add Highlight" to start.</p>
          )}
        </TabsContent>

        {/* Itinerary Tab */}
        <TabsContent value="itinerary" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Day-by-Day Itinerary</h4>
            <Button onClick={addItineraryDay} size="sm">
              <Plus className="mr-2" size={16} />
              Add Day
            </Button>
          </div>
          {(editData.itinerary || []).map((day, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Day {day.day}</CardTitle>
                  <Button onClick={() => removeItineraryDay(index)} variant="destructive" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={day.title}
                    onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                    placeholder="e.g., Arrival & Beach Relaxation"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={day.description}
                    onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                    rows={3}
                    placeholder="Describe the day's activities..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {(editData.itinerary || []).length === 0 && (
            <p className="text-sm text-muted-foreground">No itinerary added yet. Click "Add Day" to start.</p>
          )}
        </TabsContent>

        {/* Inclusions Tab */}
        <TabsContent value="inclusions" className="space-y-6">
          {/* What's Included */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">What's Included</h4>
              <Button onClick={addIncluded} size="sm">
                <Plus className="mr-2" size={16} />
                Add Item
              </Button>
            </div>
            {(editData.included || []).map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateIncluded(index, e.target.value)}
                  placeholder="e.g., Round-trip flights"
                />
                <Button onClick={() => removeIncluded(index)} variant="destructive" size="icon">
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            {(editData.included || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No inclusions added yet.</p>
            )}
          </div>

          {/* What's Not Included */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">What's Not Included</h4>
              <Button onClick={addNotIncluded} size="sm">
                <Plus className="mr-2" size={16} />
                Add Item
              </Button>
            </div>
            {(editData.notIncluded || []).map((item, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={item}
                  onChange={(e) => updateNotIncluded(index, e.target.value)}
                  placeholder="e.g., Travel insurance"
                />
                <Button onClick={() => removeNotIncluded(index)} variant="destructive" size="icon">
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
            {(editData.notIncluded || []).length === 0 && (
              <p className="text-sm text-muted-foreground">No exclusions added yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
