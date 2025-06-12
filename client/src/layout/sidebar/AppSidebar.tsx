"use client"

import { useAppSelector } from "@/store/hooks"
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

import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const user = useAppSelector((state) => state.auth.user);

    const userData = {
        name: user?.name,
        email: user?.email
    }

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
                {isLoggedIn && <NavUser user={ userData } />}
                {!isLoggedIn && <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-2" />
                    <Link className="w-full" to="/login">Login</Link>
                </Button>}
            </SidebarFooter>
        </Sidebar>
    )
}