import { Moon, Sun, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open('https://github.com/programmerftw/100x-date', '_blank')}
        className="hover:bg-accent"
      >
        <Github className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="hover:bg-accent"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}