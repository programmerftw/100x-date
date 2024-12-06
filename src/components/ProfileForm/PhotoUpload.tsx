import { Upload } from 'lucide-react';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PhotoUploadProps {
  index: number;
  photo: { url: string; description: string } | null;
  onChange: (photo: { url: string; description: string } | null) => void;
}

export function PhotoUpload({ index, photo, onChange }: PhotoUploadProps) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ url: reader.result as string, description: photo?.description || '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (description: string) => {
    if (photo) {
      onChange({ ...photo, description });
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
          id={`photo-${index}`}
        />
        <Label
          htmlFor={`photo-${index}`}
          className="block w-full aspect-square rounded-xl overflow-hidden bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
        >
          {photo?.url ? (
            <img
              src={photo.url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
              <Upload className="w-6 h-6" />
              <span className="text-sm font-medium">Upload Photo {index + 1}</span>
            </div>
          )}
        </Label>
      </div>
      <Textarea
        placeholder={`Tell us about this photo (max 40 words)`}
        value={photo?.description || ''}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        className="h-20 resize-none"
        maxLength={200}
      />
    </div>
  );
}