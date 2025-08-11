import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Wifi, 
  Battery, 
  Thermometer, 
  Lightbulb, 
  Shield, 
  Volume2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Signal,
  Zap,
  RefreshCw
} from "lucide-react";

interface DeviceStatus {
  id: string;
  name: string;
  room: string;
  type: string;
  icon: any;
  status: 'online' | 'offline' | 'warning';
  battery?: number;
  signalStrength: number;
  lastSeen: string;
  metrics: {
    [key: string]: {
      value: number;
      unit: string;
      status: 'normal' | 'warning' | 'critical';
    };
  };
}

export function RealtimeMonitoring() {
  const [devices, setDevices] = useState<DeviceStatus[]>([
    {
      id: "1",
      name: "Living Room Lights",
      room: "Living Room",
      type: "Smart Bulb",
      icon: Lightbulb,
      status: 'online',
      signalStrength: 85,
      lastSeen: "Just now",
      metrics: {
        brightness: { value: 75, unit: '%', status: 'normal' },
        power_usage: { value: 12, unit: 'W', status: 'normal' },
        temperature: { value: 42, unit: '°C', status: 'normal' }
      }
    },
    {
      id: "2",
      name: "Master Thermostat",
      room: "Bedroom",
      type: "Climate Control",
      icon: Thermometer,
      status: 'online',
      battery: 85,
      signalStrength: 92,
      lastSeen: "1 min ago",
      metrics: {
        temperature: { value: 22, unit: '°C', status: 'normal' },
        humidity: { value: 45, unit: '%', status: 'normal' },
        target_temp: { value: 23, unit: '°C', status: 'normal' }
      }
    },
    {
      id: "3",
      name: "Kitchen Speaker",
      room: "Kitchen", 
      type: "Smart Speaker",
      icon: Volume2,
      status: 'warning',
      signalStrength: 68,
      lastSeen: "5 min ago",
      metrics: {
        volume: { value: 60, unit: '%', status: 'normal' },
        cpu_usage: { value: 78, unit: '%', status: 'warning' },
        memory_usage: { value: 45, unit: '%', status: 'normal' }
      }
    },
    {
      id: "4",
      name: "Front Door Sensor",
      room: "Entrance",
      type: "Security Sensor",
      icon: Shield,
      status: 'online',
      battery: 23,
      signalStrength: 76,
      lastSeen: "2 min ago",
      metrics: {
        motion_events: { value: 12, unit: 'today', status: 'normal' },
        sensitivity: { value: 80, unit: '%', status: 'normal' },
        response_time: { value: 120, unit: 'ms', status: 'normal' }
      }
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        lastSeen: device.status === 'online' ? 'Just now' : device.lastSeen,
        metrics: {
          ...device.metrics,
          // Simulate small variations in metrics
          ...Object.fromEntries(
            Object.entries(device.metrics).map(([key, metric]) => [
              key,
              {
                ...metric,
                value: Math.max(0, metric.value + (Math.random() - 0.5) * 2)
              }
            ])
          )
        }
      })));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'offline':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 80) return 'text-success';
    if (strength >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return '';
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-warning';
    return 'text-destructive';
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const summaryStats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    warnings: devices.filter(d => d.status === 'warning').length,
    offline: devices.filter(d => d.status === 'offline').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Real-Time Monitoring</h1>
          <p className="text-muted-foreground font-body">
            Live status and performance metrics for all connected devices.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-body">Last updated</p>
            <p className="text-xs text-muted-foreground">{lastUpdated.toLocaleTimeString()}</p>
          </div>
          <Button variant="outline" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-body text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold font-heading">{summaryStats.total}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-body text-muted-foreground">Online</p>
                <p className="text-2xl font-bold font-heading text-success">{summaryStats.online}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-body text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold font-heading text-warning">{summaryStats.warnings}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium font-body text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold font-heading text-destructive">{summaryStats.offline}</p>
              </div>
              <Wifi className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Status List */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Device Status</CardTitle>
          <CardDescription className="font-body">
            Real-time health and performance monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device, index) => (
              <div 
                key={device.id} 
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <device.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium font-body">{device.name}</h4>
                      <p className="text-sm text-muted-foreground font-body">
                        {device.room} • {device.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Battery */}
                    {device.battery && (
                      <div className="flex items-center gap-1">
                        <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                        <span className={`text-sm font-body ${getBatteryColor(device.battery)}`}>
                          {device.battery}%
                        </span>
                      </div>
                    )}
                    
                    {/* Signal Strength */}
                    <div className="flex items-center gap-1">
                      <Signal className={`w-4 h-4 ${getSignalStrengthColor(device.signalStrength)}`} />
                      <span className="text-sm font-body">{device.signalStrength}%</span>
                    </div>
                    
                    {/* Status */}
                    <div className="flex items-center gap-2">
                      {getStatusIcon(device.status)}
                      <Badge variant={device.status === 'online' ? 'default' : device.status === 'warning' ? 'secondary' : 'destructive'}>
                        {device.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  {Object.entries(device.metrics).map(([key, metric]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-body capitalize">{key.replace('_', ' ')}</span>
                        <span className={`text-sm font-medium ${getMetricColor(metric.status)}`}>
                          {Math.round(metric.value)}{metric.unit}
                        </span>
                      </div>
                      {metric.unit === '%' && (
                        <Progress 
                          value={metric.value} 
                          className={`h-1 ${metric.status === 'warning' ? 'text-warning' : metric.status === 'critical' ? 'text-destructive' : ''}`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground font-body">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Last seen: {device.lastSeen}
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}