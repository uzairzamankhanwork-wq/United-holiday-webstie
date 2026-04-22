import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Loader2, Plus, Trash2 } from 'lucide-react';
import DetailedVisaEditor, { type VisaData } from './DetailedVisaEditor';

export default function VisaManager() {
  const [visas, setVisas] = useState<VisaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch visas from API
  useEffect(() => {
    fetchVisas();
  }, []);

  const fetchVisas = async () => {
    try {
      const response = await fetch('/api/admin/visas');
      const data = await response.json();
      if (data.success) {
        setVisas(data.visas);
      }
    } catch (error) {
      console.error('Error fetching visas:', error);
      alert('Failed to load visas');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (visa: VisaData) => {
    setEditingId(visa.id);
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

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/visas/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setVisas(visas.filter(visa => visa.id !== id));
        alert('Visa deleted successfully!');
      } else {
        alert('Failed to delete visa: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting visa:', error);
      alert('Failed to delete visa');
    }
  };

  const handleSave = async (editData: VisaData) => {
    setSaving(true);
    try {
      const isCreating = !editData.id || editData.id === 0;
      const url = isCreating ? '/api/admin/visas' : `/api/admin/visas/${editData.id}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      const data = await response.json();
      if (data.success) {
        if (isCreating) {
          // Refresh the list to get the new visa
          await fetchVisas();
          alert('Visa created successfully!');
        } else {
          // Update local state
          setVisas(visas.map(visa => 
            visa.id === editData.id ? data.visa : visa
          ));
          alert('Visa information updated successfully!');
        }
        setEditingId(null);
        setCreating(false);
      } else {
        alert(`Failed to ${isCreating ? 'create' : 'update'} visa: ` + data.error);
      }
    } catch (error) {
      console.error('Error saving visa:', error);
      alert('Failed to save visa');
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

  const editingVisa = visas.find(visa => visa.id === editingId);

  if (editingVisa || creating) {
    const visaData = creating ? {
      id: 0,
      visaId: '',
      title: '',
      description: '',
      countries: '',
      processingTime: '',
      validity: '',
      stayDuration: '',
      price: '',
      image: '',
      requiredDocuments: [],
      applicationProcess: [],
      faqs: [],
    } as VisaData : editingVisa!;

    return (
      <DetailedVisaEditor
        visa={visaData}
        onSave={handleSave}
        onCancel={handleCancel}
        saving={saving}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Visa Services</h2>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus size={18} />
          Create New Visa
        </Button>
      </div>

      {visas.map((visa) => (
        <Card key={visa.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl">{visa.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{visa.countries}</p>
                <p className="text-lg font-bold text-primary mt-2">{visa.price}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(visa)}>
                  <Edit className="mr-2" size={16} />
                  Edit Full Details
                </Button>
                <Button 
                  onClick={() => handleDelete(visa.id, visa.title)} 
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
                <span className="font-medium">Processing:</span> {visa.processingTime}
              </div>
              <div>
                <span className="font-medium">Price:</span> {visa.price}
              </div>
              <div>
                <span className="font-medium">Validity:</span> {visa.validity}
              </div>
              <div>
                <span className="font-medium">Stay:</span> {visa.stayDuration}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Documents:</span> {(visa.requiredDocuments || []).length} items
              </div>
              <div className="col-span-2">
                <span className="font-medium">Process Steps:</span> {(visa.applicationProcess || []).length} steps
              </div>
              <div className="col-span-2">
                <span className="font-medium">FAQs:</span> {(visa.faqs || []).length} questions
              </div>
              <div className="col-span-2">
                <span className="font-medium">Description:</span> {visa.description}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
        <p className="font-semibold mb-2">Full Content Management Enabled</p>
        <p>You can now edit all visa details including required documents, application process steps, and FAQs. All changes are saved to the database permanently!</p>
      </div>
    </div>
  );
}
