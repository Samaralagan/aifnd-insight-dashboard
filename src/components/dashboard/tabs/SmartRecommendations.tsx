import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Home, 
  Shield, 
  Thermometer, 
  Lightbulb, 
  Music, 
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  Star
} from "lucide-react";

export function SmartRecommendations() {
  const categories = [
    {
      title: "Lighting Optimization",
      icon: Lightbulb,
      description: "Smart lighting setups for comfort and energy savings",
      recommendations: 3,
      savings: "30% energy",
      color: "text-yellow-500"
    },
    {
      title: "Security Enhancement",
      icon: Shield,
      description: "Comprehensive security automation and monitoring",
      recommendations: 5,
      savings: "24/7 protection",
      color: "text-green-500"
    },
    {
      title: "Climate Control",
      icon: Thermometer,
      description: "Optimal temperature and air quality management",
      recommendations: 2,
      savings: "25% HVAC costs",
      color: "text-blue-500"
    },
    {
      title: "Entertainment Hub",
      icon: Music,
      description: "Synchronized audio and video experiences",
      recommendations: 4,
      savings: "Seamless control",
      color: "text-purple-500"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "Smart Evening Routine",
      description: "Automatically dim lights, lower temperature, and activate security when you say 'Good night'",
      category: "Automation",
      priority: "High",
      impact: "High comfort & security",
      devices: ["Philips Hue", "Nest Thermostat", "Ring Alarm"],
      setup_time: "5 minutes",
      confidence: 95
    },
    {
      id: 2,
      title: "Energy Saving Schedule",
      description: "Optimize lighting and climate based on occupancy patterns",
      category: "Efficiency",
      priority: "Medium",
      impact: "30% energy reduction",
      devices: ["Smart Lights", "Smart Thermostat", "Motion Sensors"],
      setup_time: "10 minutes",
      confidence: 88
    },
    {
      id: 3,
      title: "Security Perimeter",
      description: "Create layered security with cameras, sensors, and automated responses",
      category: "Security",
      priority: "High",
      impact: "Complete home monitoring",
      devices: ["Ring Cameras", "Door Sensors", "Motion Detectors"],
      setup_time: "15 minutes",
      confidence: 92
    },
    {
      id: 4,
      title: "Multi-Room Audio",
      description: "Synchronize music playback across all compatible speakers",
      category: "Entertainment",
      priority: "Low",
      impact: "Enhanced audio experience",
      devices: ["Sonos Speakers", "Echo Devices", "Smart TV"],
      setup_time: "8 minutes",
      confidence: 85
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-destructive text-destructive-foreground">High Priority</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium Priority</Badge>;
      case 'Low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 80) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Smart Recommendations</h1>
        <p className="text-sm sm:text-base text-muted-foreground font-body">
          AI-powered suggestions to optimize your smart home setup and automation.
        </p>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category, index) => (
          <Card key={category.title} className="card-premium hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <category.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${category.color}`} />
                <Badge variant="secondary" className="text-xs">{category.recommendations} ideas</Badge>
              </div>
              <h3 className="font-heading font-semibold mb-2 text-sm sm:text-base">{category.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-body mb-3">{category.description}</p>
              <div className="text-xs font-medium text-primary font-body">{category.savings}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insight */}
      <Card className="card-premium bg-gradient-secondary border-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold mb-2">AI Insight</h3>
              <p className="font-body text-sm mb-3">
                Based on your usage patterns, implementing the recommended evening routine could save you 
                approximately <strong>2.5 hours per week</strong> in manual device management and reduce 
                energy consumption by <strong>25%</strong>.
              </p>
              <Button variant="outline" size="sm">
                View Full Analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Personalized Recommendations</CardTitle>
          <CardDescription className="font-body">
            Custom automation suggestions based on your devices and usage patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendations.map((recommendation, index) => (
              <div 
                key={recommendation.id} 
                className="border border-border rounded-lg p-6 hover:bg-muted/50 transition-colors animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-heading font-semibold text-lg">{recommendation.title}</h4>
                      {getPriorityBadge(recommendation.priority)}
                    </div>
                    <p className="text-muted-foreground font-body mb-3">{recommendation.description}</p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-body">
                          <strong>Impact:</strong> {recommendation.impact}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-xs sm:text-sm font-body">
                          <strong>Setup:</strong> {recommendation.setup_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className={`w-4 h-4 ${getConfidenceColor(recommendation.confidence)}`} />
                        <span className="text-xs sm:text-sm font-body">
                          <strong>Confidence:</strong> {recommendation.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Devices */}
                    <div className="mb-4">
                      <p className="text-sm font-medium font-body mb-2">Required devices:</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.devices.map((device) => (
                          <Badge key={device} variant="outline" className="text-xs">
                            {device}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border gap-3 sm:gap-0">
                  <Badge variant="secondary">{recommendation.category}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      Learn More
                    </Button>
                    <Button className="btn-primary text-xs sm:text-sm" size="sm">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                      <span className="hidden sm:inline">Apply Setup</span>
                      <span className="sm:hidden">Apply</span>
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