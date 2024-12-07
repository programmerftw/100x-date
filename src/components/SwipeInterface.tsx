import { useState } from 'react';
import { ProfileCard } from './ProfileCard';
import { Header } from './Header';
import { ProfileDialog } from './ProfileDialog';

const DUMMY_PROFILES = [
  {
    name: "Alex",
    age: 25,
    bio: "Adventure seeker and coffee enthusiast. Always looking for the next mountain to climb! 🏔️",
    mainImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
        description: "Just summited Mt. Rainier! Six months of training paid off - the sunrise from up here was absolutely worth every step. Living for these mountain moments! 🏔️"
      },
      {
        url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        description: "My happy place ☕ Found this hidden gem of a coffee shop in Portland. They do the most amazing single-origin pour-overs. Ask me about my coffee brewing techniques!"
      },
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        description: "Late night coding session at my favorite tech hub. Building something exciting! When your passion becomes your work, it never feels like a job. 💻✨"
      },
      {
        url: "https://images.unsplash.com/photo-1504703395950-b89145a5425b",
        description: "Weekend getaway to the mountains. Nothing beats disconnecting from tech and reconnecting with nature. Who's up for the next adventure? 🏕️"
      }
    ],
    programmingLanguage: "Python",
    lookingFor: "Looking for someone who shares my passion for outdoor adventures and can appreciate both adrenaline rushes and quiet moments with good coffee."
  },
  // Add more profiles here
];

export function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    read: boolean;
    timestamp: Date;
  }>>([]);

  const handleAction = (action: 'like' | 'pass') => {
    if (action === 'like') {
      // Simulate a match with 30% probability
      if (Math.random() < 0.3) {
        const newNotification = {
          id: Date.now().toString(),
          message: `You matched with ${DUMMY_PROFILES[currentIndex].name}! Start coding together! 👩‍💻👨‍💻`,
          read: false,
          timestamp: new Date(),
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }
    setCurrentIndex(prev => prev + 1);
  };

  const handleNotificationClick = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <>
      <Header 
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onViewProfile={() => setShowProfile(true)}
      />

      <main className="container max-w-2xl mx-auto pt-24 px-4">
        <div className="w-full max-w-sm mx-auto aspect-[3/4]">
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
      </main>

      {/* View Profile Dialog */}
      <ProfileDialog
        profile={DUMMY_PROFILES[currentIndex]}
        open={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}