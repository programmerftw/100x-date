import { Textarea } from '@/components/ui/textarea';

interface BioSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function BioSection({ value, onChange }: BioSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Tell us about yourself
      </label>
      <Textarea
        placeholder="Share your story, interests, and what makes you unique..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-32 resize-none"
      />
    </div>
  );
}