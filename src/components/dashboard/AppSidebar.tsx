import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Search,
  Sparkles,
  Settings,
  Activity,
  Zap,
  Plug,
  Shield,
  Cpu
} from "lucide-react";

const navigationItems = [
  { title: "Device Discovery", url: "/dashboard/ai-discovery", icon: Search },
  { title: "Smart Recommendations", url: "/dashboard/smart-recommendations", icon: Sparkles },
  { title: "Device Settings", url: "/dashboard/tailored-settings", icon: Settings },
  { title: "Monitoring & Control", url: "/dashboard/realtime-monitoring", icon: Activity },
  { title: "Automation", url: "/dashboard/automation", icon: Zap },
  { title: "Integrations", url: "/dashboard/integrations", icon: Plug },
  { title: "Security & Health", url: "/dashboard/security", icon: Shield },
];

export function AppSidebar() {
  const { open, openMobile } = useSidebar();
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
    <Sidebar
      className="border-r border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hidden lg:flex lg:w-72"
      collapsible="none"
    >
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

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-heading text-xs uppercase tracking-wider mb-3">
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClass(item.url)}
                      title={item.title}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="ml-3 truncate font-medium">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-body space-y-1">
          <p>Version 2.1.0</p>
          <p>© 2025 AIFND.net</p>
        </div>
      </div>
    </Sidebar>
  );
}