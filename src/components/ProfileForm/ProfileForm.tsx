import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhotoUpload } from './PhotoUpload';
import { ProfileBio } from './ProfileBio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ProfileData {
  name: string;
  age: number;
  bio: string;
  mainImage: string;
  gallery: Array<{ 
    url: string; 
    description: string; 
  }>;
  programmingLanguage: string;
  lookingFor: string;
}

interface ProfileFormProps {
  onSubmit: (data: ProfileData) => void;
}

const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "Python",
  "Java",
  "TypeScript",
  "C++",
  "Go",
  "Rust",
  "Ruby",
  "Swift",
  "Kotlin"
] as const;

export function ProfileForm({ onSubmit }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    age: 18,
    bio: '',
    mainImage: '',
    gallery: [],
    programmingLanguage: '',
    lookingFor: '',
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
      <div className="max-w-[200px] mx-auto mb-8">
        <Label className="text-center block mb-2">Profile Photo</Label>
        <PhotoUpload
          index={-1}
          photo={formData.mainImage ? { url: formData.mainImage, description: '' } : null}
          onChange={handleMainPhotoChange}
          className="aspect-square"
        />
      </div>

      <Card className="card-gradient border-2 border-primary/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 group transition-transform duration-300 hover:scale-[1.02]">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="transition-all duration-300 hover:border-primary/50 focus:animate-glow"
              />
            </div>
            <div className="space-y-2 group transition-transform duration-300 hover:scale-[1.02]">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={18}
                max={100}
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                required
                className="transition-all duration-300 hover:border-primary/50 focus:animate-glow"
              />
            </div>
          </div>

          <div className="space-y-2 group transition-transform duration-300 hover:scale-[1.02]">
            <ProfileBio
              value={formData.bio}
              onChange={(bio) => setFormData(prev => ({ ...prev, bio }))}
            />
          </div>

          <div className="space-y-2 group transition-transform duration-300 hover:scale-[1.02]">
            <Label htmlFor="looking-for">What are you looking for?</Label>
            <Textarea
              id="looking-for"
              placeholder="Describe your ideal match, collaboration interests, or what you hope to find... (max 40 words)"
              value={formData.lookingFor}
              onChange={(e) => setFormData(prev => ({ ...prev, lookingFor: e.target.value }))}
              className="h-24 resize-none transition-all duration-300 hover:border-primary/50 focus:animate-glow"
              maxLength={200}
            />
          </div>

          <div className="space-y-2 group transition-transform duration-300 hover:scale-[1.02]">
            <Label htmlFor="programming-language" className="text-foreground/90">
              Favorite Programming Language
            </Label>
            <Select
              value={formData.programmingLanguage}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, programmingLanguage: value }))
              }
            >
              <SelectTrigger 
                id="programming-language"
                className="transition-all duration-300 hover:border-primary/50 focus:animate-glow"
              >
                <SelectValue placeholder="Select your go-to programming language" />
              </SelectTrigger>
              <SelectContent className="card-gradient border-primary/20">
                {PROGRAMMING_LANGUAGES.map((lang) => (
                  <SelectItem 
                    key={lang} 
                    value={lang}
                    className="transition-colors duration-300 hover:bg-primary/20"
                  >
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="card-gradient border-2 border-primary/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Gallery Photos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full hover-gradient transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20"
      >
        Create Profile
      </Button>
    </form>
  );
}