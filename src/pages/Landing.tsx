import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf, Users, TrendingDown, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Fighting Food Waste Together</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Connect Surplus Food with Those in Need
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AgriConnect bridges the gap between food donors and recipients, reducing waste while addressing food insecurity in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/auth")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How AgriConnect Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Leaf className="w-8 h-8 text-primary" />}
              title="Donors Share Surplus"
              description="Restaurants, farms, and grocers post available food with details about quantity, type, and pickup location."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-accent" />}
              title="Recipients Find Food"
              description="Food banks and charities browse nearby listings and claim what they need for their communities."
            />
            <FeatureCard
              icon={<TrendingDown className="w-8 h-8 text-secondary" />}
              title="Reduce Waste"
              description="Together, we reduce food waste while ensuring nutritious meals reach those who need them most."
            />
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <ImpactStat number="10,000+" label="Meals Distributed" />
            <ImpactStat number="500+" label="Active Donors" />
            <ImpactStat number="150+" label="Partner Organizations" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join AgriConnect today and help build a sustainable food system for everyone.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/auth")}
            className="gap-2"
          >
            Sign Up Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-card p-6 rounded-lg shadow-elegant hover:shadow-xl transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const ImpactStat = ({ number, label }: { number: string; label: string }) => (
  <div className="animate-fade-in">
    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{number}</div>
    <div className="text-muted-foreground">{label}</div>
  </div>
);

export default Landing;