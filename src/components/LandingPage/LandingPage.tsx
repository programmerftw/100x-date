import { useState } from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { CallToAction } from './CallToAction';
import { ProfileDialog } from '../ProfileDialog';

interface LandingPageProps {
  onProfileCreated: (profile: any) => void;
}

export function LandingPage({ onProfileCreated }: LandingPageProps) {
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const handleGetStarted = () => {
    setShowProfileDialog(true);
  };

  const handleProfileSubmit = (profile: any) => {
    onProfileCreated(profile);
    setShowProfileDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <CallToAction onGetStarted={handleGetStarted} />
      
      <ProfileDialog
        open={showProfileDialog}
        onClose={() => setShowProfileDialog(false)}
        isCreating={true}
        onSubmit={handleProfileSubmit}
      />
    </div>
  );
}