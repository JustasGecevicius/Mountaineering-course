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

export function AppSidebar() {
  const items = [
    {
      title: "Knots",
      url: "/basics/knots",
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>HEADER</SidebarHeader>
      <SidebarContent>
        <SidebarMenuButton>
          <a href={"/"}>
            <span>Home</span>
          </a>
        </SidebarMenuButton>
        <SidebarGroup>
          <SidebarGroupLabel>Basics</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
