import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Save, X } from 'lucide-react';
import ImageUploader from './ImageUploader';

export interface VisaData {
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
  requiredDocuments?: string[];
  applicationProcess?: Array<{ step: number; title: string; description: string }>;
  faqs?: Array<{ question: string; answer: string }>;
}

interface Props {
  visa: VisaData;
  onSave: (data: VisaData) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

export default function DetailedVisaEditor({ visa, onSave, onCancel, saving }: Props) {
  const [editData, setEditData] = useState<VisaData>({ ...visa });

  // Required Documents management
  const addDocument = () => {
    setEditData({
      ...editData,
      requiredDocuments: [...(editData.requiredDocuments || []), ''],
    });
  };

  const updateDocument = (index: number, value: string) => {
    const newDocs = [...(editData.requiredDocuments || [])];
    newDocs[index] = value;
    setEditData({ ...editData, requiredDocuments: newDocs });
  };

  const removeDocument = (index: number) => {
    const newDocs = (editData.requiredDocuments || []).filter((_, i) => i !== index);
    setEditData({ ...editData, requiredDocuments: newDocs });
  };

  // Application Process management
  const addProcessStep = () => {
    const nextStep = (editData.applicationProcess || []).length + 1;
    setEditData({
      ...editData,
      applicationProcess: [...(editData.applicationProcess || []), { step: nextStep, title: '', description: '' }],
    });
  };

  const updateProcessStep = (index: number, field: 'title' | 'description', value: string) => {
    const newProcess = [...(editData.applicationProcess || [])];
    newProcess[index] = { ...newProcess[index], [field]: value };
    setEditData({ ...editData, applicationProcess: newProcess });
  };

  const removeProcessStep = (index: number) => {
    const newProcess = (editData.applicationProcess || [])
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, step: i + 1 }));
    setEditData({ ...editData, applicationProcess: newProcess });
  };

  // FAQs management
  const addFaq = () => {
    setEditData({
      ...editData,
      faqs: [...(editData.faqs || []), { question: '', answer: '' }],
    });
  };

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...(editData.faqs || [])];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setEditData({ ...editData, faqs: newFaqs });
  };

  const removeFaq = (index: number) => {
    const newFaqs = (editData.faqs || []).filter((_, i) => i !== index);
    setEditData({ ...editData, faqs: newFaqs });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Editing: {visa.title}</h3>
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
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Visa Title</label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Price</label>
              <Input
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                placeholder="e.g., From £150"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Processing Time</label>
              <Input
                value={editData.processingTime}
                onChange={(e) => setEditData({ ...editData, processingTime: e.target.value })}
                placeholder="e.g., 15-20 working days"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Validity</label>
              <Input
                value={editData.validity}
                onChange={(e) => setEditData({ ...editData, validity: e.target.value })}
                placeholder="e.g., Up to 5 years"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Stay Duration</label>
              <Input
                value={editData.stayDuration}
                onChange={(e) => setEditData({ ...editData, stayDuration: e.target.value })}
                placeholder="e.g., 90 days within 180 days"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Visa ID (Slug)</label>
              <Input
                value={editData.visaId}
                onChange={(e) => setEditData({ ...editData, visaId: e.target.value })}
                placeholder="e.g., australia"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Visa Image</label>
            <ImageUploader
              currentImage={editData.image}
              onImageUploaded={(url) => setEditData({ ...editData, image: url })}
              folder="visas"
              label="Upload Visa Image"
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
              rows={3}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Countries Covered</label>
            <Textarea
              value={editData.countries}
              onChange={(e) => setEditData({ ...editData, countries: e.target.value })}
              rows={3}
              placeholder="Comma-separated list of countries"
            />
          </div>
        </TabsContent>

        {/* Required Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Required Documents</h4>
            <Button onClick={addDocument} size="sm">
              <Plus className="mr-2" size={16} />
              Add Document
            </Button>
          </div>
          {(editData.requiredDocuments || []).map((doc, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={doc}
                onChange={(e) => updateDocument(index, e.target.value)}
                placeholder="e.g., Valid passport (minimum 6 months validity)"
              />
              <Button onClick={() => removeDocument(index)} variant="destructive" size="icon">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          {(editData.requiredDocuments || []).length === 0 && (
            <p className="text-sm text-muted-foreground">No documents added yet. Click "Add Document" to start.</p>
          )}
        </TabsContent>

        {/* Application Process Tab */}
        <TabsContent value="process" className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Application Process Steps</h4>
            <Button onClick={addProcessStep} size="sm">
              <Plus className="mr-2" size={16} />
              Add Step
            </Button>
          </div>
          {(editData.applicationProcess || []).map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Step {step.step}</CardTitle>
                  <Button onClick={() => removeProcessStep(index)} variant="destructive" size="sm">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={step.title}
                    onChange={(e) => updateProcessStep(index, 'title', e.target.value)}
                    placeholder="e.g., Complete Online Application"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    value={step.description}
                    onChange={(e) => updateProcessStep(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Describe this step..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {(editData.applicationProcess || []).length === 0 && (
            <p className="text-sm text-muted-foreground">No process steps added yet. Click "Add Step" to start.</p>
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
          {(editData.faqs || []).map((faq, index) => (
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
                    placeholder="e.g., How long does processing take?"
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
          {(editData.faqs || []).length === 0 && (
            <p className="text-sm text-muted-foreground">No FAQs added yet. Click "Add FAQ" to start.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
