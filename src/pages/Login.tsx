import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Wifi, Cpu, Shield } from "lucide-react";
import loginIllustration from "@/assets/login-illustration.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app, you'd validate credentials
    navigate("/dashboard");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-3 sm:p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-accent-1/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-accent-2/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Illustration */}
        <div className="hidden lg:block animate-fade-in">
          <img 
            src={loginIllustration} 
            alt="IoT Device Management"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
          {/* Logo Section */}
          <div className="text-center animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
            </div>
            <h1 className="font-heading text-3xl font-bold text-white mb-2">AIFND.net</h1>
            <p className="text-white/80 font-body">AI-Powered IoT Device Discovery</p>
          </div>

          {/* Login Card */}
          <Card className="animate-slide-up card-glass border-white/20 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
              <CardDescription className="font-body">Sign in to your dashboard</CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      placeholder="Enter your password"
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

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-body">Remember me</Label>
                  </div>
                  <Link to="#" className="text-sm text-primary hover:text-primary-light font-medium">
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button type="submit" className="w-full h-12 btn-primary font-heading text-base">
                  Sign In
                </Button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-sm text-muted-foreground font-body">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:text-primary-light font-medium">
                      Sign Up
                    </Link>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-white/70 font-body">Auto Discovery</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-white/70 font-body">AI Management</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs text-white/70 font-body">Secure Control</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;