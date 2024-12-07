import { Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface PhotoUploadProps {
  index: number;
  photo: { url: string; description: string; } | null;
  onChange: (photo: { url: string; description: string; } | null) => void;
  className?: string;
}

export function PhotoUpload({ index, photo, onChange, className }: PhotoUploadProps) {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ 
          url: reader.result as string, 
          description: photo?.description || '' 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    const wordCount = newDescription.trim() ? newDescription.trim().split(/\s+/).length : 0;
    
    if (wordCount <= 40 && photo) {
      onChange({ ...photo, description: newDescription });
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
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

      {photo && (
        <div className="mt-2">
          <Label htmlFor={`photo-description-${index}`}>Photo Story (40 words max)</Label>
          <Textarea
            id={`photo-description-${index}`}
            value={photo.description}
            onChange={handleDescriptionChange}
            placeholder="Tell the story behind this photo..."
            className="h-20 resize-none mt-1"
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {photo.description.trim() ? photo.description.trim().split(/\s+/).length : 0}/40 words
          </p>
        </div>
      )}
    </div>
  );
} 