import { Upload } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface PhotoWithDescription {
  url: string;
  description: string;
}

interface PhotoGalleryProps {
  onPhotosChange: (photos: PhotoWithDescription[]) => void;
}

export function PhotoGallery({ onPhotosChange }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<PhotoWithDescription[]>([]);

  const handlePhotoUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...photos];
        newPhotos[index] = { url: reader.result as string, description: '' };
        setPhotos(newPhotos);
        onPhotosChange(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPhotos = [...photos];
    newPhotos[index] = { ...newPhotos[index], description: e.target.value };
    setPhotos(newPhotos);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload(index)}
              className="hidden"
              id={`photo-${index}`}
            />
            <label
              htmlFor={`photo-${index}`}
              className="block w-full aspect-square rounded-2xl overflow-hidden bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
            >
              {photos[index]?.url ? (
                <img
                  src={photos[index].url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">Photo {index + 1}</span>
                </div>
              )}
            </label>
          </div>
          <Textarea
            placeholder="Tell us about this moment... (max 40 words)"
            value={photos[index]?.description || ''}
            onChange={handleDescriptionChange(index)}
            className="h-20 resize-none"
            maxLength={200}
          />
        </div>
      ))}
    </div>
  );
}