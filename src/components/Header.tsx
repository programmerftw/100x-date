import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotificationBell } from './NotificationBell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  notifications: Array<{
    id: string;
    message: string;
    read: boolean;
    timestamp: Date;
  }>;
  onNotificationClick: (id: string) => void;
  onViewProfile: () => void;
}

export function Header({ notifications, onNotificationClick, onViewProfile }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          100xDates
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <NotificationBell 
            notifications={notifications}
            onNotificationClick={onNotificationClick}
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-accent"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewProfile}>
                View My Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 