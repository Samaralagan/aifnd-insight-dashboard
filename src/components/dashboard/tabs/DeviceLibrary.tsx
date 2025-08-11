import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Star, 
  Wifi, 
  Bluetooth, 
  Zap,
  Shield,
  Lightbulb,
  Thermometer,
  Camera,
  Speaker,
  Tv,
  Plus,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Device {
  id: string;
  name: string;
  brand: string;
  category: string;
  protocols: string[];
  rating: number;
  reviews: number;
  price: string;
  compatibility: string[];
  features: string[];
  image: string;
  aiTips: string;
  inStock: boolean;
}

export function DeviceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedProtocol, setSelectedProtocol] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: null },
    { id: "lighting", name: "Lighting", icon: Lightbulb },
    { id: "climate", name: "Climate Control", icon: Thermometer },
    { id: "security", name: "Security", icon: Camera },
    { id: "audio", name: "Audio & Entertainment", icon: Speaker },
    { id: "sensors", name: "Sensors", icon: Shield }
  ];

  const devices: Device[] = [
    {
      id: "1",
      name: "Philips Hue Smart Bulb",
      brand: "Philips",
      category: "lighting",
      protocols: ["Zigbee", "WiFi"],
      rating: 4.8,
      reviews: 2847,
      price: "$49.99",
      compatibility: ["Alexa", "Google Home", "HomeKit"],
      features: ["16M Colors", "Voice Control", "Scheduling", "Energy Efficient"],
      image: "/api/placeholder/200/150",
      aiTips: "Perfect for creating ambiance. AI suggests automatic dimming schedules based on your daily routine.",
      inStock: true
    },
    {
      id: "2",
      name: "Nest Learning Thermostat",
      brand: "Google",
      category: "climate",
      protocols: ["WiFi"],
      rating: 4.6,
      reviews: 1923,
      price: "$249.99",
      compatibility: ["Google Home", "Alexa"],
      features: ["Auto-Learning", "Energy Star", "Remote Control", "Geofencing"],
      image: "/api/placeholder/200/150",
      aiTips: "Learns your schedule automatically. AI can optimize heating/cooling for 15% energy savings.",
      inStock: true
    },
    {
      id: "3",
      name: "Ring Video Doorbell Pro",
      brand: "Amazon",
      category: "security",
      protocols: ["WiFi"],
      rating: 4.4,
      reviews: 5632,
      price: "$199.99",
      compatibility: ["Alexa", "Google Home"],
      features: ["1080p HD", "Night Vision", "Motion Detection", "Two-Way Audio"],
      image: "/api/placeholder/200/150",
      aiTips: "Integrates with smart lighting for enhanced security. AI can detect package deliveries.",
      inStock: false
    },
    {
      id: "4",
      name: "Sonos One Smart Speaker",
      brand: "Sonos",
      category: "audio",
      protocols: ["WiFi"],
      rating: 4.7,
      reviews: 3456,
      price: "$199.00",
      compatibility: ["Alexa", "Google Assistant"],
      features: ["Multi-Room", "High-Quality Audio", "Voice Control", "Wireless"],
      image: "/api/placeholder/200/150",
      aiTips: "Excellent for whole-home audio. AI can sync music with lighting for immersive experiences.",
      inStock: true
    },
    {
      id: "5",
      name: "Aqara Motion Sensor",
      brand: "Aqara",
      category: "sensors",
      protocols: ["Zigbee"],
      rating: 4.3,
      reviews: 892,
      price: "$19.99",
      compatibility: ["HomeKit", "Alexa", "Google Home"],
      features: ["120° Detection", "Wireless", "Long Battery Life", "Compact Design"],
      image: "/api/placeholder/200/150",
      aiTips: "Great for automation triggers. AI can learn patterns to avoid false triggers.",
      inStock: true
    },
    {
      id: "6",
      name: "LIFX Color Smart Bulb",
      brand: "LIFX",
      category: "lighting",
      protocols: ["WiFi"],
      rating: 4.5,
      reviews: 1567,
      price: "$54.99",
      compatibility: ["Alexa", "Google Home", "HomeKit"],
      features: ["16M Colors", "No Hub Required", "Music Sync", "Effects"],
      image: "/api/placeholder/200/150",
      aiTips: "Rich color options perfect for mood lighting. AI can sync with weather and calendar events.",
      inStock: true
    }
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || device.category === selectedCategory;
    const matchesBrand = selectedBrand === "all" || device.brand === selectedBrand;
    const matchesProtocol = selectedProtocol === "all" || device.protocols.includes(selectedProtocol);
    
    return matchesSearch && matchesCategory && matchesBrand && matchesProtocol;
  });

  const brands = ["all", ...Array.from(new Set(devices.map(d => d.brand)))];
  const protocols = ["all", ...Array.from(new Set(devices.flatMap(d => d.protocols)))];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const getProtocolIcon = (protocol: string) => {
    switch (protocol.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'bluetooth':
        return <Bluetooth className="w-3 h-3" />;
      case 'zigbee':
        return <Zap className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Device Library</h1>
        <p className="text-muted-foreground font-body">
          Discover compatible IoT devices with AI-powered setup recommendations.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="card-premium">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search devices, brands, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-body"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand === "all" ? "All Brands" : brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Protocol" />
                </SelectTrigger>
                <SelectContent>
                  {protocols.map(protocol => (
                    <SelectItem key={protocol} value={protocol}>
                      {protocol === "all" ? "All Protocols" : protocol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground font-body">
          Showing {filteredDevices.length} of {devices.length} devices
        </p>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-body">Sort by: Popular</span>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device, index) => (
          <Card key={device.id} className="card-premium hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  {device.category === 'lighting' && <Lightbulb className="w-8 h-8 text-primary" />}
                  {device.category === 'climate' && <Thermometer className="w-8 h-8 text-primary" />}
                  {device.category === 'security' && <Camera className="w-8 h-8 text-primary" />}
                  {device.category === 'audio' && <Speaker className="w-8 h-8 text-primary" />}
                  {device.category === 'sensors' && <Shield className="w-8 h-8 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground font-body">Product Image</p>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-heading font-semibold">{device.name}</h3>
                    {!device.inStock && (
                      <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground font-body">{device.brand}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(device.rating)}</div>
                  <span className="text-sm font-body">{device.rating}</span>
                  <span className="text-xs text-muted-foreground font-body">({device.reviews})</span>
                </div>

                {/* Price */}
                <div className="text-xl font-bold font-heading text-primary">{device.price}</div>

                {/* Protocols */}
                <div className="flex flex-wrap gap-1">
                  {device.protocols.map(protocol => (
                    <Badge key={protocol} variant="outline" className="text-xs">
                      {getProtocolIcon(protocol)}
                      <span className="ml-1">{protocol}</span>
                    </Badge>
                  ))}
                </div>

                {/* Compatibility */}
                <div className="space-y-1">
                  <p className="text-xs font-medium font-body">Compatible with:</p>
                  <div className="flex flex-wrap gap-1">
                    {device.compatibility.map(platform => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* AI Tips */}
                <div className="bg-accent-1/10 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs font-body text-foreground">{device.aiTips}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                  <Button 
                    className="btn-primary flex-1" 
                    size="sm"
                    disabled={!device.inStock}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {device.inStock ? 'Add to Setup' : 'Notify Me'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <Card className="card-premium">
          <CardContent className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-lg mb-2">No devices found</h3>
            <p className="text-muted-foreground font-body mb-4">
              Try adjusting your search criteria or filters to find more devices.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedBrand("all");
              setSelectedProtocol("all");
            }}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}