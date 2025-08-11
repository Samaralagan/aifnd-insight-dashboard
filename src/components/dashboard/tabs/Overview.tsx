import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus
} from "lucide-react";

export function Overview() {
  const stats = [
    {
      title: "Total Devices",
      value: "47",
      change: "+3 this week",
      icon: Wifi,
      trend: "up"
    },
    {
      title: "Active Automations",
      value: "12",
      change: "+2 this month",
      icon: Zap,
      trend: "up"
    },
    {
      title: "Open Alerts",
      value: "3",
      change: "-2 from yesterday",
      icon: AlertTriangle,
      trend: "down"
    },
    {
      title: "Network Health",
      value: "98%",
      change: "Excellent",
      icon: Shield,
      trend: "stable"
    }
  ];

  const recentActivity = [
    {
      type: "device_added",
      message: "Smart thermostat connected successfully",
      time: "2 minutes ago",
      status: "success"
    },
    {
      type: "automation_triggered",
      message: "Evening routine executed",
      time: "1 hour ago",
      status: "success"
    },
    {
      type: "firmware_update",
      message: "3 devices updated to latest firmware",
      time: "3 hours ago",
      status: "info"
    },
    {
      type: "alert",
      message: "Low battery warning on door sensor",
      time: "5 hours ago",
      status: "warning"
    }
  ];

  const quickActions = [
    {
      title: "Scan for Devices",
      description: "Discover new IoT devices on your network",
      icon: Search,
      action: "scan"
    },
    {
      title: "Create Automation",
      description: "Set up smart home routines with AI",
      icon: Plus,
      action: "create"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground font-body">
          Welcome back! Here's what's happening with your IoT devices.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="card-premium hover-lift" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-body">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <p className="text-xs text-muted-foreground font-body">
                <span className={stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}>
                  {stat.change}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="font-heading">Quick Actions</CardTitle>
            <CardDescription className="font-body">
              Common tasks to manage your IoT ecosystem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action) => (
              <div key={action.title} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <action.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium font-body">{action.title}</h4>
                  <p className="text-sm text-muted-foreground font-body">{action.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 card-premium">
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
            <CardDescription className="font-body">
              Latest events and updates from your devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-warning' :
                    activity.status === 'info' ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium font-body">{activity.message}</p>
                    <p className="text-sm text-muted-foreground font-body flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant={activity.status === 'success' ? 'default' : activity.status === 'warning' ? 'destructive' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Status Chart Placeholder */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Device Activity Trends</CardTitle>
          <CardDescription className="font-body">
            Usage patterns and performance metrics over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg border-2 border-dashed border-border">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Interactive chart coming soon</p>
              <p className="text-sm text-muted-foreground font-body">Real-time device metrics and analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}