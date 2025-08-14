import { NavLink, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Search,
  Sparkles,
  Settings,
  Activity,
  Zap,
  Plug,
  Shield,
  Cpu,
  Menu
} from "lucide-react";

const navigationItems = [
  { title: "AI-Powered Device Discovery", url: "/dashboard/ai-discovery", icon: Search },
  { title: "Smart Categorization & Recommendations", url: "/dashboard/smart-recommendations", icon: Sparkles },
  { title: "Tailored Device Settings", url: "/dashboard/tailored-settings", icon: Settings },
  { title: "Real-Time Monitoring & Control", url: "/dashboard/realtime-monitoring", icon: Activity },
  { title: "Cross-Device Automation", url: "/dashboard/automation", icon: Zap },
  { title: "Integration Support", url: "/dashboard/integrations", icon: Plug },
  { title: "Security & Network Health", url: "/dashboard/security", icon: Shield },
];

export function MobileSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/dashboard/ai-discovery" && currentPath === "/dashboard") return true;
    return currentPath === path;
  };

  const getNavClass = (path: string) => {
    const baseClass = "w-full justify-start h-11 px-4 font-body transition-all duration-200";
    return isActive(path)
      ? `${baseClass} bg-primary text-primary-foreground hover:bg-primary/90 shadow-md`
      : `${baseClass} text-muted-foreground hover:bg-muted hover:text-foreground`;
  };

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-3 sm:top-4 left-3 sm:left-4 z-50 h-8 w-8 sm:h-9 sm:w-9 lg:hidden"
          >
            <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:w-72 p-0 bg-card/95 backdrop-blur-sm">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg">AIFND.net</h2>
                <p className="text-xs text-muted-foreground font-body">IoT Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-3 py-4">
            <div className="space-y-1">
              <h3 className="font-heading text-xs uppercase tracking-wider mb-3 px-4 text-muted-foreground">
                Navigation
              </h3>
              {navigationItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={getNavClass(item.url)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3 truncate font-medium">
                    {item.title}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card/50">
            <div className="text-xs text-muted-foreground font-body space-y-1">
              <p>Version 2.1.0</p>
              <p>© 2025 AIFND.net</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}