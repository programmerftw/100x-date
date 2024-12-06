import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProfileBioProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProfileBio({ value, onChange }: ProfileBioProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="bio">About Me</Label>
      <Textarea
        id="bio"
        placeholder="Share your story, interests, and what makes you unique... (max 40 words)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-32 resize-none"
        maxLength={200}
      />
      <p className="text-sm text-muted-foreground">
        {value.split(/\s+/).length}/40 words
      </p>
    </div>
  );
}