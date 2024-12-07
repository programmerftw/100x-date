import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

interface NotificationBellProps {
  notifications: Notification[];
  onNotificationClick: (id: string) => void;
}

export function NotificationBell({ notifications, onNotificationClick }: NotificationBellProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs flex items-center justify-center text-primary-foreground animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onClick={() => onNotificationClick(notification.id)}
              className={cn(
                "flex flex-col items-start py-3 px-4 cursor-pointer",
                !notification.read && "bg-muted/50"
              )}
            >
              <p className="text-sm">{notification.message}</p>
              <span className="text-xs text-muted-foreground mt-1">
                {new Date(notification.timestamp).toLocaleString()}
              </span>
            </DropdownMenuItem>
          ))
        ) : (
          <div className="py-3 px-4 text-sm text-muted-foreground text-center">
            No notifications yet
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 