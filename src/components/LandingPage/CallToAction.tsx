import { Button } from '@/components/ui/button';

interface CallToActionProps {
  onGetStarted: () => void;
}

export function CallToAction({ onGetStarted }: CallToActionProps) {
  return (
    <div className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20" />
          <div className="relative p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Merge?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Debug your love life and find your perfect match—where code meets chemistry. One swipe could change your repo forever!
            </p>
            <Button size="lg" onClick={onGetStarted} className="rounded-full px-8">
              Create Your Love-Life Repo!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}