import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Cpu, CheckCircle, ArrowRight } from "lucide-react";
import signupIllustration from "@/assets/signup-illustration.jpg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Simulate signup - in real app, you'd register the user
    navigate("/dashboard");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${signupIllustration})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
        {/* Logo Section */}
        <div className="text-center animate-fade-in">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Cpu className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">AIFND.net</h1>
          <p className="text-muted-foreground font-body">Join the IoT Revolution</p>
        </div>

        {/* Signup Card */}
        <Card className="animate-slide-up card-premium border shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-heading text-2xl">Create Account</CardTitle>
            <CardDescription className="font-body">Start managing your IoT devices with AI</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 font-body border-border/50 focus:border-primary bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-12 font-body border-border/50 focus:border-primary bg-white/80 backdrop-blur-sm"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-12 font-body border-border/50 focus:border-primary bg-white/80 backdrop-blur-sm pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="h-12 font-body border-border/50 focus:border-primary bg-white/80 backdrop-blur-sm pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Create Account Button */}
              <Button type="submit" className="w-full h-12 btn-primary font-heading text-base group">
                Create Account
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-sm text-muted-foreground font-body">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary-light font-medium">
                    Sign In
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Automatic device discovery and setup</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-body text-muted-foreground">AI-powered smart recommendations</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-body text-muted-foreground">Enterprise-grade security and monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;