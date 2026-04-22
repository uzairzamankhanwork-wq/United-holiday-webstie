import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X, Image as ImageIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { apiFetch } from '@/lib/api';

interface ImageUploaderProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({ 
  currentImage, 
  onImageUploaded, 
  folder = 'general',
  label = 'Upload Image'
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        
        // Create preview
        setPreviewUrl(base64Data);

        // Upload to server
        const response = await apiFetch('/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64Data,
            filename: file.name,
            folder: folder,
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          onImageUploaded(data.url);
          alert('Image uploaded successfully!');
        } else {
          alert('Failed to upload image: ' + data.error);
          setPreviewUrl(currentImage || '');
        }
      };

      reader.onerror = () => {
        alert('Failed to read file');
        setPreviewUrl(currentImage || '');
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setPreviewUrl(currentImage || '');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {previewUrl ? (
        <Card className="relative overflow-hidden">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Upload size={16} />
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={handleRemove}
              disabled={uploading}
            >
              <X size={16} />
            </Button>
          </div>
          <div className="p-2 bg-muted/50 text-xs text-muted-foreground truncate">
            {previewUrl}
          </div>
        </Card>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full h-32 border-dashed"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <ImageIcon size={24} />
                <span>{label}</span>
                <span className="text-xs text-muted-foreground">
                  Click to select image (max 5MB)
                </span>
              </>
            )}
          </div>
        </Button>
      )}
    </div>
  );
}
