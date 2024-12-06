import { Heart } from 'lucide-react';
import { SignUpButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <Heart className="h-16 w-16 mx-auto mb-8 text-primary animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            100xDates
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of like-minded individuals looking for meaningful connections. 
            Share your story, showcase your personality, and meet amazing people.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted} 
            className="rounded-full px-8"
          >
            Create Your Profile
          </Button>
        </div>
      </div>
    </div>
  );
}