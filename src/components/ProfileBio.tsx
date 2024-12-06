import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProfileBioProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProfileBio({ value, onChange }: ProfileBioProps) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-2">
      <Label htmlFor="bio">About Me</Label>
      <Textarea
        id="bio"
        placeholder="Share your story, interests, and what makes you unique... (max 40 words)"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          const newWordCount = newValue.trim() ? newValue.trim().split(/\s+/).length : 0;
          if (newWordCount <= 40) {
            onChange(newValue);
          }
        }}
        className="h-32 resize-none"
        required
      />
      <p className="text-sm text-muted-foreground">
        {wordCount}/40 words
      </p>
    </div>
  );
}