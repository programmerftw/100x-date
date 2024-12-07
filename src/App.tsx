import { useState } from 'react';
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn, 
  UserButton 
} from '@clerk/clerk-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SwipeInterface } from '@/components/SwipeInterface';
import { LandingPage } from '@/components/LandingPage/LandingPage';

export default function App() {
  interface UserProfile {
    // Define the properties of UserProfile here
    id: string;
    name: string;
    email: string;
  }

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleProfileCreated = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <SignedIn>
        {!userProfile ? (
          <LandingPage onProfileCreated={handleProfileCreated} />
        ) : (
          <SwipeInterface />
        )}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}