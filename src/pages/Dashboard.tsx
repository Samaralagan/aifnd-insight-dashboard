import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AIDiscovery } from "@/components/dashboard/tabs/AIDiscovery";
import { SmartRecommendations } from "@/components/dashboard/tabs/SmartRecommendations";
import { TailoredSettings } from "@/components/dashboard/tabs/TailoredSettings";
import { RealtimeMonitoring } from "@/components/dashboard/tabs/RealtimeMonitoring";
import { CrossDeviceAutomation } from "@/components/dashboard/tabs/CrossDeviceAutomation";
import { IntegrationSupport } from "@/components/dashboard/tabs/IntegrationSupport";
import { SecurityHealth } from "@/components/dashboard/tabs/SecurityHealth";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route index element={<AIDiscovery />} />
              <Route path="ai-discovery" element={<AIDiscovery />} />
              <Route path="smart-recommendations" element={<SmartRecommendations />} />
              <Route path="tailored-settings" element={<TailoredSettings />} />
              <Route path="realtime-monitoring" element={<RealtimeMonitoring />} />
              <Route path="automation" element={<CrossDeviceAutomation />} />
              <Route path="integrations" element={<IntegrationSupport />} />
              <Route path="security" element={<SecurityHealth />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
            <div className="px-6 py-4">
              <p className="text-xs text-muted-foreground font-body text-center">
                © AIFND.net 2025 — All Rights Reserved
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;