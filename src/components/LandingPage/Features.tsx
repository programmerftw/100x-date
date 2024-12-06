import { Camera, Heart, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'Show Your Best Self',
    description: 'Upload your favorite photos and share the stories behind them.',
  },
  {
    icon: Heart,
    title: 'Meaningful Connections',
    description: 'Find people who share your interests and values.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your privacy and security are our top priorities.',
  },
  {
    icon: Sparkles,
    title: 'Smart Matching',
    description: 'Our algorithm helps you find the most compatible matches.',
  },
];

export function Features() {
  return (
    <div className="py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We've created the perfect platform for you to find genuine connections
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-background shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}