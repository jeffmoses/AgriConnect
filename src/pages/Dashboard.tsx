import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Leaf, Search, MapPin, Calendar, Package, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NewListingDialog } from "@/components/NewListingDialog";
import { EditListingDialog } from "@/components/EditListingDialog";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/food-listings`
      );
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      }
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/food-listings?id=${listingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Success",
          description: "Listing deleted successfully",
        });
        fetchListings();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete listing. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error",
        description: "Failed to delete listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">AgriConnect</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Actions */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search food listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <NewListingDialog />
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<Package className="w-5 h-5 text-primary" />}
            title="Active Listings"
            value="24"
          />
          <StatsCard
            icon={<Calendar className="w-5 h-5 text-accent" />}
            title="This Week"
            value="12"
          />
          <StatsCard
            icon={<MapPin className="w-5 h-5 text-secondary" />}
            title="Nearby"
            value="8"
          />
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Loading listings...
            </div>
          ) : listings.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No listings found. Be the first to post!
            </div>
          ) : (
            listings.map((listing) => (
            <Card key={listing._id} className="hover:shadow-elegant transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <CardDescription>{listing.donor}</CardDescription>
                  </div>
                  <Badge variant="secondary">{listing.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>{listing.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Best before: {listing.expiry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.location}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1" variant="outline">
                    View Details
                  </Button>
                  <EditListingDialog listing={listing} onSuccess={fetchListings} />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(listing._id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-4">
        <div className="bg-muted p-3 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;