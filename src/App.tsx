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
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleProfileCreated = (profile: any) => {
    setUserProfile(profile);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 flex items-center gap-4">
        <ThemeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>

      <SignedIn>
        {!userProfile ? (
          <LandingPage onProfileCreated={handleProfileCreated} />
        ) : (
          <div className="container max-w-2xl mx-auto py-8 px-4">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                100xDates
              </h1>
              <p className="text-muted-foreground">
                Like or pass to find your perfect match
              </p>
            </div>
            <SwipeInterface />
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}