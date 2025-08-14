import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Edit2, 
  Trash2, 
  ArrowRight,
  Lightbulb,
  Camera,
  Thermometer,
  Music,
  Shield,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react";

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: string[];
  status: 'active' | 'inactive' | 'paused';
  lastRun?: string;
  runCount: number;
}

export function CrossDeviceAutomation() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: "1",
      name: "Evening Security Mode",
      description: "Activate security when no motion detected for 30 minutes after 9 PM",
      trigger: "No motion detected for 30 minutes after 9:00 PM",
      actions: ["Lock all doors", "Turn on security cameras", "Set lights to 20%", "Enable motion alerts"],
      status: 'active',
      lastRun: "2025-01-10 21:30",
      runCount: 45
    },
    {
      id: "2", 
      name: "Morning Wake-up Routine",
      description: "Gradual lighting and temperature adjustment when alarm is dismissed",
      trigger: "Phone alarm dismissed between 6:00-8:00 AM",
      actions: ["Gradually increase bedroom lights to 80%", "Set thermostat to 22°C", "Start coffee maker", "Open smart blinds"],
      status: 'active',
      lastRun: "2025-01-11 07:15",
      runCount: 23
    },
    {
      id: "3",
      name: "Movie Night Mode",
      description: "Optimize environment for entertainment",
      trigger: "TV turned on and time is after 7 PM",
      actions: ["Dim living room lights to 30%", "Close blinds", "Set surround sound volume to 60%", "Turn off kitchen lights"],
      status: 'paused',
      lastRun: "2025-01-09 20:45",
      runCount: 12
    }
  ]);

  const [newAutomation, setNewAutomation] = useState({
    trigger: "",
    actions: ""
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const createAutomation = () => {
    if (!newAutomation.trigger || !newAutomation.actions) return;
    
    const automation: Automation = {
      id: Date.now().toString(),
      name: `Custom Automation ${automations.length + 1}`,
      description: `When ${newAutomation.trigger.toLowerCase()}, execute actions`,
      trigger: newAutomation.trigger,
      actions: newAutomation.actions.split(',').map(action => action.trim()),
      status: 'active',
      runCount: 0
    };

    setAutomations([...automations, automation]);
    setNewAutomation({ trigger: "", actions: "" });
    setShowCreateForm(false);
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(auto => 
      auto.id === id 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ));
  };

  const deleteAutomation = (id: string) => {
    setAutomations(prev => prev.filter(auto => auto.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'paused':
        return <Badge variant="secondary">Paused</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const quickTemplates = [
    {
      name: "Security Alert Response",
      trigger: "Motion detected when away",
      actions: "Turn on all lights, Start recording, Send notification, Sound alarm"
    },
    {
      name: "Energy Saving Mode",
      trigger: "No activity for 2 hours",
      actions: "Turn off unnecessary lights, Lower thermostat by 2°C, Pause music, Close blinds"
    },
    {
      name: "Welcome Home",
      trigger: "Door unlocked between 5-7 PM",
      actions: "Turn on entrance lights, Set comfortable temperature, Start favorite playlist, Disarm security"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Cross-Device Automation</h1>
          <p className="text-sm sm:text-base text-muted-foreground font-body">
            Create intelligent workflows using natural language to automate your smart home.
          </p>
        </div>
        <Button className="btn-primary w-full sm:w-auto" onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        <Card className="card-premium">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-heading">{automations.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-body">Total Automations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{automations.filter(a => a.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground font-body">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">{automations.reduce((sum, a) => sum + a.runCount, 0)}</p>
                <p className="text-sm text-muted-foreground font-body">Total Executions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-heading">12</p>
                <p className="text-sm text-muted-foreground font-body">Connected Devices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Automation Form */}
      {showCreateForm && (
        <Card className="card-premium border-primary/20">
          <CardHeader>
            <CardTitle className="font-heading">Create New Automation</CardTitle>
            <CardDescription className="font-body">
              Describe what should trigger your automation and what actions to take
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-body mb-2">Trigger (When...)</label>
              <Input
                placeholder="e.g., Motion detected in living room"
                value={newAutomation.trigger}
                onChange={(e) => setNewAutomation({...newAutomation, trigger: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium font-body mb-2">Actions (Then... - comma separated)</label>
              <Textarea
                placeholder="e.g., Turn on lights, Start security recording, Send notification"
                value={newAutomation.actions}
                onChange={(e) => setNewAutomation({...newAutomation, actions: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button className="btn-primary" onClick={createAutomation}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Automation
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Templates */}
      {!showCreateForm && (
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="font-heading">Quick Templates</CardTitle>
            <CardDescription className="font-body">
              Start with these common automation scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {quickTemplates.map((template, index) => (
                <div 
                  key={template.name}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => {
                    setNewAutomation({
                      trigger: template.trigger,
                      actions: template.actions
                    });
                    setShowCreateForm(true);
                  }}
                >
                  <h4 className="font-medium font-body mb-2">{template.name}</h4>
                  <p className="text-xs text-muted-foreground font-body mb-2">
                    <strong>When:</strong> {template.trigger}
                  </p>
                  <p className="text-xs text-muted-foreground font-body">
                    <strong>Then:</strong> {template.actions}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Automations */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Your Automations</CardTitle>
          <CardDescription className="font-body">
            Manage and monitor your active automation workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automations.map((automation, index) => (
              <div 
                key={automation.id}
                className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-heading font-semibold text-lg">{automation.name}</h4>
                      {getStatusBadge(automation.status)}
                    </div>
                    <p className="text-muted-foreground font-body mb-3">{automation.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium font-body text-sm mb-2">Trigger:</h5>
                        <p className="text-xs sm:text-sm text-muted-foreground font-body bg-muted/50 p-2 rounded">
                          {automation.trigger}
                        </p>
                      </div>
                      <div>
                        <h5 className="font-medium font-body text-sm mb-2">Actions:</h5>
                        <div className="space-y-1">
                          {automation.actions.map((action, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground font-body">
                              <ArrowRight className="w-3 h-3" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border gap-3 sm:gap-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-body">
                    {automation.lastRun && (
                      <span>Last run: {automation.lastRun}</span>
                    )}
                    <span>Executions: {automation.runCount}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => toggleAutomation(automation.id)}
                    >
                      {automation.status === 'active' ? (
                        <><Pause className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" /><span className="hidden sm:inline">Pause</span></>
                      ) : (
                        <><Play className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" /><span className="hidden sm:inline">Activate</span></>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => deleteAutomation(automation.id)}
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}