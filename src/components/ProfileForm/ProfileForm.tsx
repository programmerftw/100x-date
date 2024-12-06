import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhotoUpload } from './PhotoUpload';
import { ProfileBio } from './ProfileBio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileData {
  name: string;
  age: number;
  bio: string;
  mainImage: string;
  gallery: Array<{ url: string; description: string }>;
}

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void;
}

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    age: 18,
    bio: '',
    mainImage: '',
    gallery: [],
  });

  const handleMainPhotoChange = (photo: { url: string; description: string } | null) => {
    if (photo) {
      setFormData(prev => ({ ...prev, mainImage: photo.url }));
    }
  };

  const handleGalleryPhotoChange = (index: number, photo: { url: string; description: string } | null) => {
    setFormData(prev => {
      const newGallery = [...prev.gallery];
      if (photo) {
        newGallery[index] = photo;
      }
      return { ...prev, gallery: newGallery };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={18}
                max={100}
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>

          <ProfileBio
            value={formData.bio}
            onChange={(bio) => setFormData(prev => ({ ...prev, bio }))}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Photos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Main Profile Photo</Label>
            <PhotoUpload
              index={-1}
              photo={formData.mainImage ? { url: formData.mainImage, description: '' } : null}
              onChange={handleMainPhotoChange}
            />
          </div>

          <div className="space-y-4">
            <Label>Gallery Photos</Label>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <PhotoUpload
                  key={index}
                  index={index}
                  photo={formData.gallery[index] || null}
                  onChange={(photo) => handleGalleryPhotoChange(index, photo)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Create Profile
      </Button>
    </form>
  );
}