import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Wifi,
  Lock,
  Eye,
  Download,
  Zap,
  Activity,
  Globe,
  Server,
  Smartphone,
  Router,
  HardDrive
} from "lucide-react";

interface SecurityAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  device?: string;
  timestamp: string;
  resolved: boolean;
}

interface NetworkDevice {
  id: string;
  name: string;
  type: string;
  ip: string;
  status: 'secure' | 'warning' | 'vulnerable';
  lastSeen: string;
  firmwareVersion: string;
  updateAvailable: boolean;
}

export function SecurityHealth() {
  const [networkHealth, setNetworkHealth] = useState(87);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: "1",
      type: 'warning',
      title: "Firmware Update Available",
      description: "Ring Doorbell Pro has a security update available",
      device: "Ring Doorbell Pro",
      timestamp: "2025-01-11 14:30",
      resolved: false
    },
    {
      id: "2",
      type: 'critical',
      title: "Weak Password Detected",
      description: "Default password found on TP-Link Camera",
      device: "TP-Link Kasa Cam",
      timestamp: "2025-01-11 12:15",
      resolved: false
    },
    {
      id: "3",
      type: 'info',
      title: "New Device Connected",
      description: "Unknown device joined the network",
      timestamp: "2025-01-11 09:45",
      resolved: true
    }
  ]);

  const [networkDevices, setNetworkDevices] = useState<NetworkDevice[]>([
    {
      id: "1",
      name: "Ring Doorbell Pro",
      type: "Security Camera",
      ip: "192.168.1.15",
      status: 'warning',
      lastSeen: "2025-01-11 15:20",
      firmwareVersion: "1.2.3",
      updateAvailable: true
    },
    {
      id: "2",
      name: "Philips Hue Bridge",
      type: "Smart Hub",
      ip: "192.168.1.8",
      status: 'secure',
      lastSeen: "2025-01-11 15:22",
      firmwareVersion: "1.58.0",
      updateAvailable: false
    },
    {
      id: "3",
      name: "TP-Link Kasa Cam",
      type: "Security Camera",
      ip: "192.168.1.22",
      status: 'vulnerable',
      lastSeen: "2025-01-11 15:18",
      firmwareVersion: "1.0.0",
      updateAvailable: true
    },
    {
      id: "4",
      name: "Nest Thermostat",
      type: "Climate Control",
      ip: "192.168.1.35",
      status: 'secure',
      lastSeen: "2025-01-11 15:21",
      firmwareVersion: "6.2.1",
      updateAvailable: false
    }
  ]);

  const startSecurityScan = () => {
    setScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 8;
        if (next >= 100) {
          clearInterval(interval);
          setScanning(false);
          // Simulate finding new issues
          const newAlert: SecurityAlert = {
            id: Date.now().toString(),
            type: 'warning',
            title: "Port Scan Detected",
            description: "Suspicious network activity from external IP",
            timestamp: new Date().toLocaleString(),
            resolved: false
          };
          setAlerts(prev => [newAlert, ...prev]);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? {...alert, resolved: true} : alert
    ));
  };

  const updateFirmware = (deviceId: string) => {
    setNetworkDevices(prev => prev.map(device =>
      device.id === deviceId 
        ? {...device, updateAvailable: false, status: 'secure', firmwareVersion: '2.0.0'}
        : device
    ));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'secure':
        return <Badge className="bg-success text-success-foreground">Secure</Badge>;
      case 'warning':
        return <Badge variant="secondary">Warning</Badge>;
      case 'vulnerable':
        return <Badge variant="destructive">Vulnerable</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'security camera':
        return <Eye className="w-5 h-5" />;
      case 'smart hub':
        return <Router className="w-5 h-5" />;
      case 'climate control':
        return <Activity className="w-5 h-5" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const securityMetrics = [
    { label: "Secure Devices", value: networkDevices.filter(d => d.status === 'secure').length, total: networkDevices.length, color: "text-success" },
    { label: "Firmware Updates", value: networkDevices.filter(d => d.updateAvailable).length, total: networkDevices.length, color: "text-warning" },
    { label: "Active Alerts", value: alerts.filter(a => !a.resolved).length, total: alerts.length, color: "text-destructive" },
    { label: "Network Health", value: networkHealth, total: 100, color: "text-primary", isPercentage: true }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Security & Network Health</h1>
          <p className="text-sm sm:text-base text-muted-foreground font-body">
            Monitor network security, device vulnerabilities, and system health in real-time.
          </p>
        </div>
        <Button 
          className="btn-primary" 
          onClick={startSecurityScan}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <Activity className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Run Security Scan
            </>
          )}
        </Button>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={metric.label} className="card-premium animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium font-body text-xs sm:text-sm truncate">{metric.label}</h3>
                <div className={`w-3 h-3 rounded-full ${metric.color.replace('text-', 'bg-')} flex-shrink-0`}></div>
              </div>
              <div className="space-y-1">
                <p className={`text-lg sm:text-2xl font-bold font-heading ${metric.color}`}>
                  {metric.value}{metric.isPercentage ? '%' : `/${metric.total}`}
                </p>
                {!metric.isPercentage && (
                  <Progress value={(metric.value / metric.total) * 100} className="h-1" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Scan Progress */}
      {scanning && (
        <Card className="card-premium border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <div>
                <h3 className="font-heading font-semibold">Security Scan in Progress</h3>
                <p className="text-sm text-muted-foreground font-body">
                  Analyzing network security, checking device vulnerabilities...
                </p>
              </div>
            </div>
            <Progress value={scanProgress} className="h-2" />
            <p className="text-xs text-muted-foreground font-body mt-2">{scanProgress}% complete</p>
          </CardContent>
        </Card>
      )}

      {/* Security Alerts */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Security Alerts</CardTitle>
          <CardDescription className="font-body">
            Recent security notifications and recommended actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div 
                key={alert.id}
                className={`flex items-start gap-4 p-4 border rounded-lg transition-colors animate-scale-in ${
                  alert.resolved ? 'bg-muted/30 border-muted' : 'hover:bg-muted/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium font-body ${alert.resolved ? 'line-through text-muted-foreground' : ''}`}>
                      {alert.title}
                    </h4>
                    {alert.resolved && <Badge variant="outline">Resolved</Badge>}
                  </div>
                  <p className={`text-sm font-body mb-2 ${alert.resolved ? 'text-muted-foreground' : ''}`}>
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
                    <span>{alert.timestamp}</span>
                    {alert.device && <span>Device: {alert.device}</span>}
                  </div>
                </div>
                {!alert.resolved && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => resolveAlert(alert.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Resolve
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Devices */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Network Devices</CardTitle>
          <CardDescription className="font-body">
            Monitor device security status and firmware updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkDevices.map((device, index) => (
              <div 
                key={device.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium font-body">{device.name}</h4>
                      {getStatusBadge(device.status)}
                    </div>
                    <p className="text-sm text-muted-foreground font-body">
                      {device.type} • {device.ip} • v{device.firmwareVersion}
                    </p>
                    <p className="text-xs text-muted-foreground font-body">
                      Last seen: {device.lastSeen}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {device.updateAvailable && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateFirmware(device.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Update Firmware
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Lock className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Health Overview */}
      <Card className="card-premium bg-gradient-secondary border-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Wifi className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold mb-2">Network Health Score: {networkHealth}%</h3>
              <p className="font-body text-sm mb-3">
                Your network security is <strong>{networkHealth >= 80 ? 'Good' : networkHealth >= 60 ? 'Fair' : 'Poor'}</strong>. 
                {networkHealth < 80 && ' Consider addressing the security alerts above to improve your score.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-body">Firewall Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-body">Encryption Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-sm font-body">Updates Pending</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}