import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from './ProfileForm/ProfileForm';

interface ProfileDialogProps {
  profile?: {
    name: string;
    age: number;
    bio: string;
    mainImage: string;
    gallery: Array<{ url: string; description: string }>;
    programmingLanguage?: string;
    lookingFor?: string;
  };
  open: boolean;
  onClose: () => void;
  isCreating?: boolean;
  onSubmit?: (data: any) => void;
}

export function ProfileDialog({ profile, open, onClose, isCreating, onSubmit }: ProfileDialogProps) {
  if (isCreating && onSubmit) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <ProfileForm onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  if (!profile) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] p-0">
        <Tabs defaultValue="main" className="h-full flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold mb-2">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-muted-foreground mb-2">{profile.bio}</p>
            {profile.programmingLanguage && (
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-medium">Favorite Language:</span> {profile.programmingLanguage}
              </p>
            )}
            <TabsList className="mt-4">
              <TabsTrigger value="main">Main Photo</TabsTrigger>
              {profile.gallery.map((_, idx) => (
                <TabsTrigger key={idx} value={`photo-${idx}`}>
                  Photo {idx + 1}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 relative">
            <TabsContent value="main" className="absolute inset-0 h-full">
              <div className="relative w-full h-full">
                <img
                  src={profile.mainImage}
                  alt={`${profile.name}'s main photo`}
                  className="w-full h-full object-cover"
                />
              </div>
            </TabsContent>

            {profile.gallery.map((photo, idx) => (
              <TabsContent
                key={idx}
                value={`photo-${idx}`}
                className="absolute inset-0 h-full"
              >
                <div className="relative w-full h-full">
                  <img
                    src={photo.url}
                    alt={`${profile.name}'s photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {photo.description && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <p className="text-white text-lg leading-relaxed">
                        {photo.description}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}