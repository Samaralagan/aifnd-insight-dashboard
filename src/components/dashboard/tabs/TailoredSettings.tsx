import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Lightbulb, 
  Thermometer, 
  Volume2, 
  Shield, 
  Wifi,
  Battery,
  Save,
  RotateCcw,
  Check,
  AlertCircle
} from "lucide-react";

interface DeviceSetting {
  id: string;
  name: string;
  room: string;
  type: string;
  icon: any;
  status: 'online' | 'offline';
  battery?: number;
  settings: {
    [key: string]: {
      value: number | boolean;
      min?: number;
      max?: number;
      unit?: string;
      type: 'slider' | 'switch';
    };
  };
}

export function TailoredSettings() {
  const [devices, setDevices] = useState<DeviceSetting[]>([
    {
      id: "1",
      name: "Living Room Lights",
      room: "Living Room",
      type: "Smart Bulb",
      icon: Lightbulb,
      status: 'online',
      settings: {
        brightness: { value: 75, min: 0, max: 100, unit: '%', type: 'slider' },
        temperature: { value: 3200, min: 2700, max: 6500, unit: 'K', type: 'slider' },
        schedule: { value: true, type: 'switch' }
      }
    },
    {
      id: "2",
      name: "Master Bedroom Thermostat",
      room: "Bedroom",
      type: "Climate Control",
      icon: Thermometer,
      status: 'online',
      battery: 85,
      settings: {
        temperature: { value: 22, min: 16, max: 30, unit: '°C', type: 'slider' },
        humidity: { value: 45, min: 30, max: 70, unit: '%', type: 'slider' },
        eco_mode: { value: false, type: 'switch' }
      }
    },
    {
      id: "3",
      name: "Kitchen Speaker",
      room: "Kitchen",
      type: "Smart Speaker",
      icon: Volume2,
      status: 'online',
      settings: {
        volume: { value: 60, min: 0, max: 100, unit: '%', type: 'slider' },
        bass: { value: 50, min: 0, max: 100, unit: '%', type: 'slider' },
        voice_response: { value: true, type: 'switch' }
      }
    },
    {
      id: "4",
      name: "Front Door Sensor",
      room: "Entrance",
      type: "Security Sensor",
      icon: Shield,
      status: 'online',
      battery: 62,
      settings: {
        sensitivity: { value: 80, min: 0, max: 100, unit: '%', type: 'slider' },
        notifications: { value: true, type: 'switch' },
        night_mode: { value: true, type: 'switch' }
      }
    }
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateDeviceSetting = (deviceId: string, settingKey: string, value: number | boolean) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? {
            ...device,
            settings: {
              ...device.settings,
              [settingKey]: {
                ...device.settings[settingKey],
                value
              }
            }
          }
        : device
    ));
    setHasUnsavedChanges(true);
  };

  const saveAllSettings = () => {
    // Simulate saving
    setTimeout(() => {
      setHasUnsavedChanges(false);
    }, 1000);
  };

  const resetDevice = (deviceId: string) => {
    // Reset to default values - this is simplified
    console.log('Resetting device:', deviceId);
  };

  const getStatusIndicator = (status: string) => {
    return status === 'online' 
      ? <div className="w-2 h-2 bg-success rounded-full"></div>
      : <div className="w-2 h-2 bg-destructive rounded-full"></div>;
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return '';
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Tailored Settings</h1>
          <p className="text-muted-foreground font-body">
            Customize device parameters and preferences for optimal performance.
          </p>
        </div>
        {hasUnsavedChanges && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setHasUnsavedChanges(false)}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Discard Changes
            </Button>
            <Button className="btn-primary" onClick={saveAllSettings}>
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        )}
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <Card className="border-warning bg-warning/5">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertCircle className="w-5 h-5 text-warning" />
            <p className="font-body text-sm">
              You have unsaved changes. Don't forget to save your settings.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Device Settings */}
      <div className="grid gap-6">
        {devices.map((device, index) => (
          <Card key={device.id} className="card-premium animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <device.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-heading">{device.name}</CardTitle>
                    <CardDescription className="font-body flex items-center gap-2">
                      {device.room} • {device.type}
                      {getStatusIndicator(device.status)}
                      <span className="text-xs">{device.status}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {device.battery && (
                    <div className="flex items-center gap-1">
                      <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                      <span className={`text-sm font-body ${getBatteryColor(device.battery)}`}>
                        {device.battery}%
                      </span>
                    </div>
                  )}
                  <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                    {device.status === 'online' ? 'Connected' : 'Offline'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {Object.entries(device.settings).map(([key, setting]) => (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium font-body capitalize">
                      {key.replace('_', ' ')}
                    </Label>
                    {setting.type === 'slider' && (
                      <span className="text-sm text-muted-foreground font-body">
                        {setting.value}{setting.unit}
                      </span>
                    )}
                  </div>
                  
                  {setting.type === 'slider' ? (
                    <Slider
                      value={[setting.value as number]}
                      onValueChange={([value]) => updateDeviceSetting(device.id, key, value)}
                      min={setting.min}
                      max={setting.max}
                      step={key === 'temperature' && setting.unit === 'K' ? 100 : 1}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={setting.value as boolean}
                        onCheckedChange={(checked) => updateDeviceSetting(device.id, key, checked)}
                      />
                      <Label className="text-sm font-body">
                        {setting.value ? 'Enabled' : 'Disabled'}
                      </Label>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex justify-end pt-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={() => resetDevice(device.id)}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Settings */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Quick Settings</CardTitle>
          <CardDescription className="font-body">
            Apply common settings across multiple devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <Lightbulb className="w-5 h-5 mb-2 text-primary" />
              <h4 className="font-medium font-body">Evening Mode</h4>
              <p className="text-xs text-muted-foreground font-body">Dim all lights to 30%</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <Thermometer className="w-5 h-5 mb-2 text-primary" />
              <h4 className="font-medium font-body">Energy Saver</h4>
              <p className="text-xs text-muted-foreground font-body">Optimize for efficiency</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
              <Shield className="w-5 h-5 mb-2 text-primary" />
              <h4 className="font-medium font-body">Away Mode</h4>
              <p className="text-xs text-muted-foreground font-body">Secure and monitor</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}