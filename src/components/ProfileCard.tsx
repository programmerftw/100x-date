import { ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProfileDialog } from './ProfileDialog';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  profile: {
    name: string;
    age: number;
    bio: string;
    mainImage: string;
    gallery: Array<{ url: string; description: string }>;
    programmingLanguage?: string;
    lookingFor?: string;
  };
  onAction: (action: 'like' | 'pass') => void;
}

export function ProfileCard({ profile, onAction }: ProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const images = [profile.mainImage, ...profile.gallery.map(g => g.url)];

  const handleTapImage = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="relative w-full h-full">
        <div className="relative w-full h-full bg-card rounded-3xl overflow-hidden shadow-xl">
          <div className="w-full h-full cursor-pointer" onClick={handleTapImage}>
            <img
              src={images[currentImageIndex]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
            <Button
              size="icon"
              variant="destructive"
              className="rounded-full h-12 w-12 shadow-lg"
              onClick={() => onAction('pass')}
            >
              <ThumbsDown className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="default"
              className="rounded-full h-12 w-12 bg-primary shadow-lg hover:bg-primary/90"
              onClick={() => onAction('like')}
            >
              <ThumbsUp className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold">
                  {profile.name}, {profile.age}
                </h2>
                <p className="mt-2 line-clamp-2">{profile.bio}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-white hover:text-white/90"
                onClick={() => setShowDialog(true)}
              >
                <Info className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="absolute top-20 left-0 right-0 flex justify-center gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  idx === currentImageIndex
                    ? "w-6 bg-white"
                    : "w-4 bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <ProfileDialog
        profile={profile}
        open={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}