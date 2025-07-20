import { type Icon } from "@tabler/icons-react"
import { ChevronRight } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel
} from "@/components/ui/sidebar"

import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Link } from "react-router-dom"

type innerItem = {
  title: string;
  url: string;
  isActive?: boolean;
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon | Icon
    items?: Array<innerItem>
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>

          { items.map((item) => (
            !item.items? <SidebarMenuItem key={ item.title }>
              <SidebarMenuButton tooltip={ item.title }>
                <Link to={ item.url } className="flex items-center gap-2">
                  { item.icon && <item.icon /> }
                  <span>{ item.title }</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem> :
            <Collapsible
              key={ item.title }
              title={ item.title }
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    { item.icon && <item.icon className="mr-2"/> }
                    { item.title }{ " " }
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent className="pl-4">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      { item.items?.map((item) => (
                        <SidebarMenuItem key={ item.title }>
                          <SidebarMenuButton asChild isActive={ item.isActive }>
                            <Link to={ item.url }>{ item.title }</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )) }
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          )) }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
