"use client"

import logo from "../../assets/logo.png"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import data from "@/utils/navbarData"
import { Link } from "react-router-dom"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" { ...props }>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link to="/">
                                <img className="w-8" src={ logo } alt="Logo" />
                                <span className="text-base font-semibold">ExpenseFlux</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={ data.navMain } />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={ data.user } />
            </SidebarFooter>
        </Sidebar>
    )
}