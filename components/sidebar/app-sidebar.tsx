import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { sidebarConfig } from "./config";

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>{sidebarConfig.header.name}</SidebarHeader>
      <SidebarContent>
        {Object.entries(sidebarConfig.body).map(([name, data]) => {
          if (data.type === "button") {
            return (
              <SidebarMenuButton key={data.id} asChild>
                <a href={data.href}>
                  <span>{name}</span>
                </a>
              </SidebarMenuButton>
            );
          }
          if (data.type === "group") {
            return (
              <SidebarGroup key={data.id}>
                <SidebarGroupLabel>{name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  {Object.entries(data.body).map(([subName, subData]) => (
                    <SidebarMenuItem key={subData.id}>
                      <SidebarMenuButton asChild>
                        <a href={subData.href}>
                          <span>{subName}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
