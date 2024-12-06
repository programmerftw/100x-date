import { useState } from 'react';
import { ProfileCard } from './ProfileCard';

const DUMMY_PROFILES = [
  {
    name: "Alex",
    age: 25,
    bio: "Adventure seeker and coffee enthusiast. Always looking for the next mountain to climb! 🏔️",
    mainImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
        description: "Conquered Mt. Rainier last weekend! The view was incredible."
      },
      {
        url: "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3",
        description: "Coffee tasting in Portland"
      },
      {
        url: "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4",
        description: "Love spending time in nature, finding peace in solitude."
      },
      {
        url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659",
        description: "Music is my escape. Nothing beats a good vinyl session."
      }
    ]
  },
  // Add more profiles here
];

export function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = (action: 'like' | 'pass') => {
    console.log(`Action ${action} on profile ${currentIndex}`);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4]">
      {DUMMY_PROFILES.map((profile, index) => (
        index >= currentIndex && (
          <ProfileCard
            key={index}
            profile={profile}
            onAction={handleAction}
          />
        )
      ))}
    </div>
  );
}