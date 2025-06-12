
import { BarChart3, Users, Settings, Home, FileText, HelpCircle, ClipboardList, Package, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Policy Management",
    url: "/admin/policies",
    icon: FileText,
  },
  {
    title: "Claim Management",
    url: "/admin/claims",
    icon: ClipboardList,
  },
  {
    title: "Product & Pricing",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "Reports & Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Support",
    url: "/admin/support",
    icon: HelpCircle,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    // For now, redirect to login page
    window.location.href = "/login";
  };

  return (
    <Sidebar className="bg-orange-200">
      <SidebarHeader className="p-4 bg-orange-300">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Byte Buddies</h2>
            <p className="text-sm text-gray-600">Administrator</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-orange-200">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="text-gray-700 hover:bg-orange-300 data-[active=true]:bg-orange-300 data-[active=true]:text-gray-800"
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-orange-300 cursor-pointer"
                >
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
