import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Wifi, 
  Loader2,
  CheckCircle,
  Plus,
  Eye,
  Settings,
  Lightbulb,
  Thermometer,
  Camera,
  Speaker,
  Tv,
  Shield
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  brand: string;
  type: string;
  protocol: string;
  strength: number;
  status: 'discovered' | 'analyzing' | 'ready';
  icon: any;
}

export function AIDiscovery() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [discoveredDevices, setDiscoveredDevices] = useState<Device[]>([]);

  const deviceTypes = [
    { icon: Lightbulb, name: "Smart Lights", count: 8, color: "text-yellow-500" },
    { icon: Thermometer, name: "Climate Control", count: 3, color: "text-blue-500" },
    { icon: Camera, name: "Security Cameras", count: 5, color: "text-green-500" },
    { icon: Speaker, name: "Audio Systems", count: 4, color: "text-purple-500" },
    { icon: Tv, name: "Entertainment", count: 2, color: "text-red-500" },
    { icon: Shield, name: "Security Sensors", count: 6, color: "text-orange-500" }
  ];

  const mockDevices: Device[] = [
    {
      id: "1",
      name: "Philips Hue Bridge",
      brand: "Philips",
      type: "Lighting Hub",
      protocol: "Zigbee",
      strength: 85,
      status: 'ready',
      icon: Lightbulb
    },
    {
      id: "2", 
      name: "Nest Thermostat",
      brand: "Google",
      type: "Climate Control",
      protocol: "Wi-Fi",
      strength: 92,
      status: 'analyzing',
      icon: Thermometer
    },
    {
      id: "3",
      name: "Ring Doorbell Pro",
      brand: "Amazon",
      type: "Security Camera",
      protocol: "Wi-Fi",
      strength: 78,
      status: 'discovered',
      icon: Camera
    },
    {
      id: "4",
      name: "Sonos One",
      brand: "Sonos",
      type: "Smart Speaker",
      protocol: "Wi-Fi",
      strength: 88,
      status: 'ready',
      icon: Speaker
    }
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setDiscoveredDevices([]);

    // Simulate progressive discovery
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setDiscoveredDevices(mockDevices);
          return 100;
        }
        
        // Add devices progressively
        if (next === 30) setDiscoveredDevices([mockDevices[0]]);
        if (next === 50) setDiscoveredDevices([mockDevices[0], mockDevices[1]]);
        if (next === 70) setDiscoveredDevices([mockDevices[0], mockDevices[1], mockDevices[2]]);
        if (next === 90) setDiscoveredDevices(mockDevices);
        
        return next;
      });
    }, 800);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-success text-success-foreground">Ready to Add</Badge>;
      case 'analyzing':
        return <Badge variant="secondary">Analyzing...</Badge>;
      case 'discovered':
        return <Badge variant="outline">Discovered</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">AI Device Discovery</h1>
        <p className="text-muted-foreground font-body">
          Automatically discover and configure IoT devices on your network using AI.
        </p>
      </div>

      {/* Device Type Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {deviceTypes.map((type, index) => (
          <Card key={type.name} className="card-premium text-center hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-4">
              <type.icon className={`w-8 h-8 mx-auto mb-2 ${type.color}`} />
              <h3 className="font-medium font-body text-sm">{type.name}</h3>
              <p className="text-2xl font-bold font-heading">{type.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scan Controls */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Search className="w-5 h-5" />
            Network Scan
          </CardTitle>
          <CardDescription className="font-body">
            Scan your network for compatible IoT devices and add them automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning && discoveredDevices.length === 0 && (
            <div className="text-center py-8">
              <Wifi className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg mb-2">Ready to Discover Devices</h3>
              <p className="text-muted-foreground font-body mb-4">
                Click the button below to start scanning for IoT devices on your network.
              </p>
              <Button onClick={startScan} className="btn-primary">
                <Search className="w-4 h-4 mr-2" />
                Start Network Scan
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-medium font-body">Scanning network...</span>
                </div>
                <span className="text-sm text-muted-foreground font-body">{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
              <p className="text-sm text-muted-foreground font-body">
                Discovering devices and analyzing their capabilities...
              </p>
            </div>
          )}

          {!isScanning && discoveredDevices.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-semibold">Scan Complete</h4>
                <Button onClick={startScan} variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Scan Again
                </Button>
              </div>
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium font-body">
                  Found {discoveredDevices.length} compatible devices
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Discovered Devices */}
      {discoveredDevices.length > 0 && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="font-heading">Discovered Devices</CardTitle>
            <CardDescription className="font-body">
              Review and add the devices found on your network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {discoveredDevices.map((device, index) => (
                <div 
                  key={device.id} 
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <device.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium font-body">{device.name}</h4>
                      <p className="text-sm text-muted-foreground font-body">
                        {device.brand} • {device.type} • {device.protocol}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Wifi className="w-3 h-3" />
                          <span className="text-xs font-body">{device.strength}%</span>
                        </div>
                        {getStatusBadge(device.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                    <Button 
                      className="btn-primary" 
                      size="sm"
                      disabled={device.status !== 'ready'}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Device
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}