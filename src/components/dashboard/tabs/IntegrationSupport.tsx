import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plug, 
  Check, 
  ExternalLink,
  Code,
  Download,
  Settings,
  Smartphone,
  Home,
  Mic,
  Wifi,
  Cloud,
  Shield,
  Zap,
  Globe
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'connected' | 'available' | 'setup_required';
  category: 'voice_assistant' | 'platform' | 'protocol' | 'developer';
  setupSteps?: string[];
  features: string[];
}

export function IntegrationSupport() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "alexa",
      name: "Amazon Alexa",
      description: "Voice control for all your smart devices",
      icon: Mic,
      status: 'connected',
      category: 'voice_assistant',
      features: ["Voice commands", "Routines", "Smart home skills", "Device discovery"]
    },
    {
      id: "google_home",
      name: "Google Home",
      description: "Google Assistant integration",
      icon: Home,
      status: 'available',
      category: 'voice_assistant',
      setupSteps: ["Enable Google Home skill", "Link your account", "Discover devices"],
      features: ["Voice control", "Routines", "Room assignment", "Broadcast"]
    },
    {
      id: "homekit",
      name: "Apple HomeKit",
      description: "Native iOS Home app integration",
      icon: Smartphone,
      status: 'setup_required',
      category: 'platform',
      setupSteps: ["Enable HomeKit bridge", "Scan QR code in iOS Home app", "Configure rooms"],
      features: ["Siri voice control", "iOS shortcuts", "Secure encryption", "Scene automation"]
    },
    {
      id: "api_sdk",
      name: "Developer API/SDK",
      description: "REST API and SDK for custom integrations",
      icon: Code,
      status: 'available',
      category: 'developer',
      features: ["RESTful API", "WebSocket events", "Python SDK", "Node.js SDK", "Authentication"]
    },
    {
      id: "mqtt",
      name: "MQTT Protocol",
      description: "Lightweight messaging for IoT devices",
      icon: Wifi,
      status: 'connected',
      category: 'protocol',
      features: ["Real-time messaging", "Device status updates", "Command publishing", "Event streaming"]
    },
    {
      id: "webhooks",
      name: "Webhooks",
      description: "HTTP callbacks for real-time notifications",
      icon: Globe,
      status: 'available',
      category: 'developer',
      setupSteps: ["Configure endpoint URL", "Set up authentication", "Choose events"],
      features: ["Real-time events", "Custom payloads", "Retry logic", "Security headers"]
    }
  ]);

  const [setupProgress, setSetupProgress] = useState<{[key: string]: number}>({});

  const connectIntegration = (id: string) => {
    // Simulate connection process
    setSetupProgress({...setupProgress, [id]: 0});
    
    const steps = integrations.find(i => i.id === id)?.setupSteps?.length || 3;
    const stepTime = 1500;

    for (let i = 1; i <= steps; i++) {
      setTimeout(() => {
        setSetupProgress(prev => ({...prev, [id]: (i / steps) * 100}));
        
        if (i === steps) {
          setTimeout(() => {
            setIntegrations(prev => prev.map(integration => 
              integration.id === id 
                ? {...integration, status: 'connected'}
                : integration
            ));
            setSetupProgress(prev => {
              const newProgress = {...prev};
              delete newProgress[id];
              return newProgress;
            });
          }, 500);
        }
      }, i * stepTime);
    }
  };

  const disconnectIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id 
        ? {...integration, status: 'available'}
        : integration
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-success text-success-foreground">Connected</Badge>;
      case 'available':
        return <Badge variant="secondary">Available</Badge>;
      case 'setup_required':
        return <Badge variant="destructive">Setup Required</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voice_assistant':
        return <Mic className="w-4 h-4" />;
      case 'platform':
        return <Smartphone className="w-4 h-4" />;
      case 'protocol':
        return <Wifi className="w-4 h-4" />;
      case 'developer':
        return <Code className="w-4 h-4" />;
      default:
        return <Plug className="w-4 h-4" />;
    }
  };

  const categories = [
    { name: 'voice_assistant', label: 'Voice Assistants', count: integrations.filter(i => i.category === 'voice_assistant').length },
    { name: 'platform', label: 'Platforms', count: integrations.filter(i => i.category === 'platform').length },
    { name: 'protocol', label: 'Protocols', count: integrations.filter(i => i.category === 'protocol').length },
    { name: 'developer', label: 'Developer Tools', count: integrations.filter(i => i.category === 'developer').length }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Integration Support</h1>
        <p className="text-muted-foreground font-body">
          Connect AIFND.net with popular platforms, voice assistants, and developer tools.
        </p>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card key={category.name} className="card-premium text-center hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                {getCategoryIcon(category.name)}
              </div>
              <h3 className="font-medium font-body text-sm mb-1">{category.label}</h3>
              <p className="text-2xl font-bold font-heading">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connection Status */}
      <Card className="card-premium bg-gradient-secondary border-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Cloud className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold mb-2">Integration Status</h3>
              <p className="font-body text-sm mb-3">
                You have <strong>{integrations.filter(i => i.status === 'connected').length}</strong> integrations active out of <strong>{integrations.length}</strong> available. 
                Connected integrations enable seamless control across platforms.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-body">
                    {integrations.filter(i => i.status === 'connected').length} Connected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full"></div>
                  <span className="text-sm font-body">
                    {integrations.filter(i => i.status !== 'connected').length} Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrations Grid */}
      <div className="grid gap-6">
        {integrations.map((integration, index) => (
          <Card key={integration.id} className="card-premium animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <integration.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-heading font-semibold text-lg">{integration.name}</h4>
                      {getStatusBadge(integration.status)}
                    </div>
                    <p className="text-muted-foreground font-body text-sm">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(integration.category)}
                  <span className="text-xs text-muted-foreground font-body capitalize">
                    {integration.category.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Setup Progress */}
              {setupProgress[integration.id] !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium font-body">Setting up integration...</span>
                    <span className="text-sm text-muted-foreground font-body">{Math.round(setupProgress[integration.id])}%</span>
                  </div>
                  <Progress value={setupProgress[integration.id]} className="h-2" />
                </div>
              )}

              {/* Setup Steps */}
              {integration.setupSteps && integration.status !== 'connected' && setupProgress[integration.id] === undefined && (
                <div className="mb-4">
                  <h5 className="font-medium font-body text-sm mb-2">Setup Steps:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    {integration.setupSteps.map((step, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground font-body">{step}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Features */}
              <div className="mb-4">
                <h5 className="font-medium font-body text-sm mb-2">Features:</h5>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  {integration.status === 'connected' && (
                    <div className="flex items-center gap-1 text-success">
                      <Check className="w-4 h-4" />
                      <span className="text-sm font-body">Connected</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {integration.id === 'api_sdk' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download SDK
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Documentation
                  </Button>
                  {integration.status === 'connected' ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => disconnectIntegration(integration.id)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  ) : (
                    <Button 
                      className="btn-primary" 
                      size="sm"
                      onClick={() => connectIntegration(integration.id)}
                      disabled={setupProgress[integration.id] !== undefined}
                    >
                      <Plug className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Developer Resources */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Developer Resources</CardTitle>
          <CardDescription className="font-body">
            Build custom integrations with our comprehensive developer tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <Code className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium font-body mb-2">REST API</h4>
              <p className="text-sm text-muted-foreground font-body mb-3">
                Full-featured REST API with comprehensive device control
              </p>
              <Button variant="outline" size="sm">
                View API Docs
              </Button>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <Download className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium font-body mb-2">SDKs</h4>
              <p className="text-sm text-muted-foreground font-body mb-3">
                Official SDKs for Python, Node.js, and more
              </p>
              <Button variant="outline" size="sm">
                Download SDKs
              </Button>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-medium font-body mb-2">Webhooks</h4>
              <p className="text-sm text-muted-foreground font-body mb-3">
                Real-time event notifications for your applications
              </p>
              <Button variant="outline" size="sm">
                Setup Webhooks
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}