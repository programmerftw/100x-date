import { Upload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ProfileUploadProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

export function ProfileUpload({ onImageSelect, className }: ProfileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={cn("relative group cursor-pointer", className)}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="profile-upload"
      />
      <label
        htmlFor="profile-upload"
        className="block w-full aspect-square rounded-3xl overflow-hidden bg-muted hover:bg-muted/80 transition-colors"
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Upload className="w-8 h-8" />
            <span className="text-sm font-medium">Upload your best photo</span>
          </div>
        )}
      </label>
    </div>
  );
}