import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  FileText,
  Video,
  Users,
  Globe,
  Book,
  HelpCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Support ticket submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      title: "Email Support",
      description: "Get detailed help via email",
      icon: Mail,
      contact: "support@aifnd.net",
      responseTime: "4-6 hours",
      availability: "24/7",
      status: "available"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our experts",
      icon: Phone,
      contact: "+1 (555) 123-AIFD",
      responseTime: "Immediate",
      availability: "Mon-Fri 9AM-6PM EST",
      status: "available"
    },
    {
      title: "Live Chat",
      description: "Real-time assistance",
      icon: MessageCircle,
      contact: "Available in dashboard",
      responseTime: "< 2 minutes",
      availability: "Mon-Fri 9AM-6PM EST",
      status: "available"
    },
    {
      title: "Video Support",
      description: "Screen sharing assistance",
      icon: Video,
      contact: "By appointment",
      responseTime: "Same day",
      availability: "Mon-Fri 10AM-5PM EST",
      status: "available"
    }
  ];

  const resources = [
    {
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      icon: Book,
      link: "/docs",
      color: "text-blue-500"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      link: "/tutorials",
      color: "text-purple-500"
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      icon: Users,
      link: "/community",
      color: "text-green-500"
    },
    {
      title: "API Documentation",
      description: "Technical integration guides",
      icon: FileText,
      link: "/api-docs",
      color: "text-orange-500"
    },
    {
      title: "Status Page",
      description: "System status and updates",
      icon: Globe,
      link: "/status",
      color: "text-red-500"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions",
      icon: HelpCircle,
      link: "/faq",
      color: "text-indigo-500"
    }
  ];

  const recentTickets = [
    {
      id: "#AIK-2025-001",
      subject: "Device discovery not working",
      status: "resolved",
      created: "2 days ago",
      priority: "high"
    },
    {
      id: "#AIK-2025-002", 
      subject: "Integration with Google Home",
      status: "in_progress",
      created: "1 week ago",
      priority: "medium"
    },
    {
      id: "#AIK-2025-003",
      subject: "Billing question",
      status: "pending",
      created: "2 weeks ago",
      priority: "low"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-success text-success-foreground">Resolved</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-destructive text-destructive-foreground">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Contact Support</h1>
        <p className="text-muted-foreground font-body">
          Get help with your IoT devices and AIFND.net platform questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <Card className="lg:col-span-2 card-premium">
          <CardHeader>
            <CardTitle className="font-heading">Submit Support Ticket</CardTitle>
            <CardDescription className="font-body">
              Describe your issue and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                    className="font-body"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="font-body"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="font-medium">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Brief description of your issue"
                  className="font-body"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Account</SelectItem>
                      <SelectItem value="integration">Device Integration</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Priority</Label>
                  <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                  className="font-body"
                  required
                />
              </div>

              <Button type="submit" className="btn-primary w-full">
                <Send className="w-4 h-4 mr-2" />
                Submit Support Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Methods & Resources */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="font-heading">Contact Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={method.title} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <method.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium font-body">{method.title}</h4>
                      <p className="text-xs text-muted-foreground font-body mb-2">{method.description}</p>
                      <p className="text-sm font-body mb-1">{method.contact}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                        <Clock className="w-3 h-3" />
                        {method.responseTime}
                      </div>
                      <p className="text-xs text-muted-foreground font-body">{method.availability}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">Available</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Tickets */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="font-heading">Recent Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium font-body text-sm">{ticket.id}</p>
                      <p className="text-sm text-muted-foreground font-body">{ticket.subject}</p>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-body">{ticket.created}</span>
                    {getPriorityBadge(ticket.priority)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Self-Help Resources */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="font-heading">Self-Help Resources</CardTitle>
          <CardDescription className="font-body">
            Find answers quickly with our comprehensive help resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <div 
                key={resource.title} 
                className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <resource.icon className={`w-5 h-5 ${resource.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium font-body">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground font-body">{resource.description}</p>
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